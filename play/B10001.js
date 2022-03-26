/* eslint-disable no-undef */
const TMyTimer = {
  type: 'TIMER_WIDGET',
  icon: 'icon-widget-timer',
  title: '定时器',
  properties: [
    {
      key: 'running',
      keyName: '是否启用',
      valueType: 'boolean',
      defaultValue: false,
      readonly: true,
    },
    {
      key: 'limit',
      keyName: '任务执行次数上限',
      valueType: 'number',
      defaultValue: 5,
    },
  ],
  methods: [
    {
      key: 'setInterval',
      keyName: '设置定时任务',
      params: [
        {
          key: 'time',
          valueType: 'number',
        },
      ],
    },
    {
      key: 'clearInterval',
      keyName: '清除定时任务',
      params: [],
    },
  ],
  events: [
    {
      key: 'onTimeIsUp',
      keyName: '时间到了',
      params: [],
    },
    {
      key: 'onLimitChange',
      keyName: '上限改变',
      params: [
        {
          key: 'limit',
          keyName: '任务执行次数上限',
          type: ['number'],
        },
      ],
    },
  ],
};

// 运行态使用
class MyTimer extends InvisibleWidget {
  // 编辑态可以修改的属性和 id 通过 props 传给运行态的控件实例
  constructor(props) {
    super(props);
    this.timerId = undefined;
    this.running = false;
    this._limit = props.limit;
  }

  get limit() {
    return this._limit;
  }

  set limit(newLimit) {
    if (this._limit !== newLimit && newLimit > 0) {
      this._limit = newLimit;
      this.emit('onLimitChange', this._limit);
    }
  }

  setInterval(time) {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
    this.running = true;
    let count = 0;
    this.timerId = setInterval(() => {
      if (count < this._limit) {
        this.emit('onTimeIsUp');
        count++;
      } else {
        this.clearInterval();
      }
    }, time * 1000);
  }

  clearInterval() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
      this.running = false;
    }
  }
}

exports.types = TMyTimer;
exports.widget = MyTimer;
