import '@moleculer/lab';
import { BrokerOptions } from 'moleculer';

const enableApm = Number(process.env.MOLECULER_APM_ENABLE) === 1;

const Config: BrokerOptions = {
  metrics: {
    enabled: enableApm,
    reporter: 'Laboratory',
  },
  tracing: {
    enabled: true,
    exporter: enableApm ? 'Laboratory' : 'Console',
  },
  logger: enableApm ? [{ type: 'Console' }, { type: 'Laboratory' }] : true,
};

export default Config;
