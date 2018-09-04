
const _disabledFeatures = ['use_localstorage_for_settings',
  'header_symbol_search',
  'left_toolbar',
  'symbol_info',
  'timeframes_toolbar',
  'show_hide_button_in_legend',
  'format_button_in_legend',
  'header_compare',
  'header_saveload',
  'save_chart_properties_to_local_storage',
  'header_chart_type',
  'display_market_status',
  'symbol_search_hot_key',
  'compare_symbol',
  'border_around_the_chart',
  'remove_library_container_border',
  'header_interval_dialog_button',
  'show_interval_dialog_on_key_press',
  'volume_force_overlay']

const _enabledFeatures = ['dont_show_boolean_study_arguments',
  'move_logo_to_main_pane',
  'hide_last_na_study_output']

const _overrides = {
  'mainSeriesProperties.candleStyle.borderColor': '#C400CB',
  'mainSeriesProperties.candleStyle.borderDownColor': '#ef7248',
  'mainSeriesProperties.candleStyle.borderUpColor': '#63a24b',
  'mainSeriesProperties.candleStyle.downColor': '#ef7248',
  'mainSeriesProperties.candleStyle.drawBorder': true,
  'mainSeriesProperties.candleStyle.drawWick': true,
  'mainSeriesProperties.candleStyle.upColor': '#63a24b',
  'mainSeriesProperties.candleStyle.wickUpColor': '#6A833A',
  'mainSeriesProperties.candleStyle.wickDownColor': '#ef7248',
  'mainSeriesProperties.style': 1,
  'paneProperties.background': '#201F3A',
  'paneProperties.crossHairProperties.color': '#626c73',
  'paneProperties.horzGridProperties.color': '#2f2f54',
  'paneProperties.vertGridProperties.color': '#2f2f54',
  'scalesProperties.backgroundColor': '#201F3A',
  'scalesProperties.lineColor': '#555555',
  'scalesProperties.textColor': '#999999',
  volumePaneSize: 'medium'
}

const _studiesOverrides = {
  'volume.volume.color.0': '#8A3A3B',
  'volume.volume.color.1': '#6A833A',
  'volume.volume.transparency': 70,
  'moving average.precision': 4
}

export default (market: string, _datafeed: any, _locale: string) => (
  {
    fullscreen: false,
    symbol: market,
    autosize: true,
    interval: '30',
    container_id: 'tv_chart_container',
    datafeed: _datafeed,
    timezone: 'Asia/Shanghai',
    library_path: '/charting_library/',
    locale: _locale,
    drawings_access: { type: 'black', tools: [{ name: 'Regression Trend' }] },
    disabled_features: _disabledFeatures,
    enabled_features: _enabledFeatures,
    charts_storage_url: '//saveload.tradingview.com',
    charts_storage_api_version: '1.1',
    client_id: 'tradingview.com',
    user_id: 'public_user_id',
    custom_css_url: '/charting_library/custom/custom.theme.css',
    overrides: _overrides,
    studies_overrides: _studiesOverrides
  }
)

export const mobileConfig = (_market: string, _datafeed: any, _locale: string, _interval: string) => (
{
  fullscreen: false,
  symbol: _market,
  autosize: true,
  interval: _interval,
  container_id: 'tv_chart_container',
  datafeed: _datafeed,
  timezone: 'Asia/Shanghai',
  library_path: '/charting_library/',
  locale: _locale,
  drawings_access: { type: 'black', tools: [{ name: 'Regression Trend' }] },
  disabled_features: _disabledFeatures,
  enabled_features: _enabledFeatures,
  preset: 'mobile',
  charts_storage_url: '//saveload.tradingview.com',
  charts_storage_api_version: '1.1',
  client_id: 'tradingview.com',
  user_id: 'public_user_id',
  overrides: _overrides,
  studies_overrides: _studiesOverrides
}
)
