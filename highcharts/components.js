import Highcharts from 'highcharts'

const highchartsProps = Object.freeze({
  mapChart(props, dfltOptions) {
    props.mapChart = {
      type: Object,
      default: () => (dfltOptions.mapChart || {})
    }
  }
})

const highchartsMods = Object.freeze({
  exporting(HC) {
    const { default: exportingInit } = require('highcharts/modules/exporting')
    exportingInit(HC)
    return { featureAdded: 'exporting' }
  },
  stockChart(HC) {
    const { default: stockInit } = require('highcharts/modules/stock')
    stockInit(HC)
    return { featureAdded: 'stockChart' }
  },
  mapChart(HC, { mapChart }) {
    const mapName = mapChart.mapName || 'myMapName'
    const mapData = mapChart.mapData || require('@highcharts/map-collection/custom/world.geo.json')
    const { default: mapInit } = require('highcharts/modules/map')
    mapInit(HC)
    Highcharts.maps[mapName] = mapData
    return { featureAdded: 'mapChart', maps: Highcharts.maps }
  }
})

export default function ComponentFactory(
  variant = 'chart',
  dfltOptions = {}
) {
  const props = {
    options: {
      type: Object,
      required: true,
      default: () => (dfltOptions.chartOptions || {})
    },
    redraw: {
      type: Boolean,
      default: true
    },
    oneToOne: {
      type: Boolean,
      default: true
    },
    animation: {
      type: Object,
      default: () => ({})
    },
    highcharts: {
      type: Object,
      default: () => (Highcharts)
    },
    exporting: {
      type: Boolean,
      default: dfltOptions.exporting !== undefined ? dfltOptions.exporting : false
    },
    update: {
      type: Array,
      default: () => ['options']
    }
  }
  if (highchartsProps[variant]) {
    highchartsProps[variant](props, dfltOptions)
  }
  return {
    template: '<div ref="chart"></div>',
    render: createElement => createElement('div', {
      ref: 'chart'
    }),
    props,
    computed: {
      optsCopy() {
        return { ...this.options }
      }
    },
    methods: {
      'options.caption'(newValue) {
        this.chart.setCaption(newValue)
      },
      'options.series'(newValue) {
        this.chart.series.forEach((s, idx) => {
          s.update(newValue[idx])
        })
      },
      'options.subtitle'(newValue) {
        this.chart.setSubtitle(newValue)
      },
      'options.title'(newValue) {
        this.chart.setTitle(newValue)
      },
      'options.yAxis'(newValue) {
        if (Array.isArray(this.chart.yAxis)) {
          this.chart.yAxis.forEach((a, idx) => {
            a.update(newValue[idx])
          })
        } else {
          this.chart.yAxis.update(newValue)
        }
      },
      'options.xAxis'(newValue) {
        if (Array.isArray(this.chart.yAxis)) {
          this.chart.xAxis.forEach((a, idx) => {
            a.update(newValue[idx])
          })
        } else {
          this.chart.xAxis.update(newValue)
        }
      },
      updateAll(newValue) {
        this.chart.update(newValue, this.redraw, this.oneToOne, this.animation)
      },
      updateWatchers(watchers, oldWatchers) {
        this.unwatch.forEach((u) => u())
        this.unwatch = []
        this.update.forEach((watcher = 'options') => {
          const w = this[watcher] || this.updateAll
          if (watcher === 'options') {
            this.unwatch.push(this.$watch(watcher, this.updateAll, { deep: true }))
          } else if (w && typeof w === 'function') {
            this.unwatch.push(this.$watch(watcher, w))
          }
        })
      }
    },
    mounted() {
      if (!this.options) {
        console.warn('Highchart Vue options missing for', variant)
      } else {
        const HC = this.highcharts
        if (highchartsMods[variant]) {
          highchartsMods[variant](HC, props)
        }

        if (this.exporting) {
          highchartsMods.exporting(HC)
        }
        this.chart = HC[variant](
          this.$refs.chart,
          this.optsCopy,
          (resp) => {
            this.$emit('chartLoaded', resp)
          }
        )

        this.unwatch = []
        this.updateWatchers()
        this.$watch('update', this.updateWatchers)
      }
    },
    beforeDestroy() {
      // Destroy chart if exists
      if (this.chart) {
        this.chart.destroy()
      }
    }
  }
}