export type Platform = 'harmony' | 'ios';

export interface MetricValues {
  response?: number;
  completion?: number;
  presentFence?: number;
  rsFps?: number;
  averageFps?: number;
  droppedFrames?: number;
  averageMemory?: number;
  peakMemory?: number;
  stableMemory?: number;
  appInstructions?: number;
  renderInstructions?: number;
}

export interface BenchmarkRecord {
  id: string;
  scenario: string;
  platform: Platform;
  device: string;
  renderMode: string;
  artifacts: { kmp: string; cmp: string; skiko: string };
  values: Record<string, MetricValues>;
}

export const versions = ["1.2.0-07", "1.2.0-02", "1.1.0-13", "1.1.0-06", "0.5.0-28", "0.5.0-11", "0.4.0-23", "0.3.0-perf"];

export const latestVersion = versions[0];
export const sourceUrl = 'https://docs.qq.com/sheet/DSkhGQUtZZWFFaWdB?tab=ckj1fz';

export const records: BenchmarkRecord[] = [
  {
    "id": "scenario-1",
    "scenario": "Picture 100 非lazy，去text",
    "platform": "harmony",
    "device": "Mate80Pro",
    "renderMode": "自渲染",
    "artifacts": {
      "kmp": "2.2.21-1.2.0-04",
      "cmp": "1.9.2-1.2.0-07",
      "skiko": "0.9.22.2-1.2.0-09"
    },
    "values": {
      "1.2.0-07": {
        "response": 44.89,
        "completion": 81.61,
        "averageMemory": 213.22,
        "peakMemory": 222.23,
        "presentFence": 119.94,
        "rsFps": 120.22,
        "stableMemory": 141.61,
        "appInstructions": 4284967830.0,
        "renderInstructions": 5042961161.0
      },
      "1.2.0-02": {
        "response": 41.73,
        "completion": 77.73,
        "averageMemory": 222.37,
        "peakMemory": 223.6,
        "presentFence": 120.21,
        "rsFps": 120.21,
        "appInstructions": 4440941136.0,
        "renderInstructions": 5069195129.0
      },
      "1.1.0-13": {
        "response": 42.39,
        "completion": 84.84,
        "averageMemory": 223.79,
        "peakMemory": 230.61,
        "presentFence": 120.38,
        "rsFps": 120.21,
        "appInstructions": 4556203604.0,
        "renderInstructions": 5243225885.0
      },
      "1.1.0-06": {
        "response": 46.79,
        "completion": 87.45,
        "averageMemory": 233.03,
        "peakMemory": 236.87,
        "presentFence": 120.02,
        "rsFps": 120.2,
        "appInstructions": 4388661577.0,
        "renderInstructions": 5106348583.0
      },
      "0.5.0-28": {
        "response": 49.92,
        "completion": 85.0,
        "averageMemory": 229.87,
        "peakMemory": 241.22,
        "rsFps": 120.19,
        "appInstructions": 4481896540.0,
        "renderInstructions": 5205125939.0
      },
      "0.5.0-11": {
        "response": 47.61,
        "completion": 76.27,
        "averageMemory": 220.87,
        "peakMemory": 227.34,
        "averageFps": 120.22
      },
      "0.4.0-23": {
        "response": 46.54,
        "completion": 83.48,
        "averageMemory": 224.92,
        "peakMemory": 234.24,
        "averageFps": 120.21
      },
      "0.3.0-perf": {
        "response": 49.48,
        "completion": 83.68,
        "averageMemory": 223.17,
        "peakMemory": 232.79,
        "averageFps": 120.22,
        "appInstructions": 4961936161.0,
        "renderInstructions": 5082021804.0
      }
    }
  },
  {
    "id": "scenario-2",
    "scenario": "Picture 100 非lazy，去text",
    "platform": "harmony",
    "device": "Mate80Pro",
    "renderMode": "统一渲染",
    "artifacts": {
      "kmp": "2.2.21-1.2.0-04",
      "cmp": "1.9.2-1.2.0-07",
      "skiko": "0.9.22.2-1.2.0-09"
    },
    "values": {
      "1.2.0-07": {
        "response": 55.51,
        "completion": 108.04,
        "averageMemory": 155.91,
        "peakMemory": 184.38,
        "presentFence": 118.69,
        "rsFps": 121.2,
        "stableMemory": 112.06,
        "appInstructions": 3247748913.0,
        "renderInstructions": 5661231468.0
      },
      "1.2.0-02": {
        "response": 56.66,
        "completion": 106.6,
        "averageMemory": 152.16,
        "peakMemory": 181.61,
        "presentFence": 119.04,
        "rsFps": 121.21,
        "appInstructions": 3330000384.0,
        "renderInstructions": 5711754159.0
      },
      "1.1.0-13": {
        "response": 57.5,
        "completion": 110.22,
        "averageMemory": 153.67,
        "peakMemory": 185.29,
        "presentFence": 118.93,
        "rsFps": 120.37,
        "appInstructions": 3323575941.0,
        "renderInstructions": 5893662193.0
      },
      "1.1.0-06": {
        "response": 56.75,
        "completion": 105.63,
        "averageMemory": 151.95,
        "peakMemory": 185.56,
        "presentFence": 119.88,
        "rsFps": 119.02,
        "appInstructions": 3167874761.0,
        "renderInstructions": 5794306299.0
      },
      "0.5.0-28": {
        "response": 54.38,
        "completion": 105.18,
        "averageMemory": 156.63,
        "peakMemory": 189.56,
        "rsFps": 118.06,
        "appInstructions": 3130879873.0,
        "renderInstructions": 5632769530.0
      },
      "0.5.0-11": {
        "response": 55.01,
        "completion": 103.03,
        "averageMemory": 137.02,
        "peakMemory": 179.19,
        "averageFps": 111.93
      },
      "0.4.0-23": {
        "response": 56.49,
        "completion": 107.38,
        "averageMemory": 132.7,
        "peakMemory": 173.09,
        "averageFps": 111.8
      },
      "0.3.0-perf": {
        "response": 51.4,
        "completion": 104.09,
        "averageMemory": 141.18,
        "peakMemory": 181.95,
        "averageFps": 111.96,
        "appInstructions": 3153071339.0,
        "renderInstructions": 5583240485.0
      }
    }
  },
  {
    "id": "scenario-3",
    "scenario": "Picture 100 非lazy，去text",
    "platform": "ios",
    "device": "iOS",
    "renderMode": "默认",
    "artifacts": {
      "kmp": "2.2.21-0.5.0-14",
      "cmp": "1.9.2-0.5.0-28",
      "skiko": "0.9.22.2-0.5.0-28"
    },
    "values": {
      "1.2.0-07": {
        "response": 65.28,
        "completion": 159.72,
        "averageMemory": 138.64,
        "rsFps": 60.0
      },
      "1.2.0-02": {
        "response": 65.28,
        "completion": 159.72,
        "averageMemory": 138.64,
        "rsFps": 60.0
      },
      "1.1.0-13": {
        "response": 65.28,
        "completion": 159.72,
        "averageMemory": 138.64,
        "rsFps": 60.0
      },
      "1.1.0-06": {
        "response": 65.28,
        "completion": 159.72,
        "averageMemory": 138.64,
        "rsFps": 60.0
      },
      "0.5.0-28": {
        "response": 65.28,
        "completion": 159.72,
        "averageMemory": 138.64,
        "rsFps": 60.0
      },
      "0.5.0-11": {
        "response": 65.28,
        "completion": 159.72,
        "averageMemory": 138.64,
        "averageFps": 60.0
      },
      "0.4.0-23": {
        "response": 54.17,
        "completion": 144.44,
        "averageMemory": 134.47,
        "averageFps": 60.0
      },
      "0.3.0-perf": {
        "response": 62.55,
        "completion": 137.61,
        "averageMemory": 137.19,
        "averageFps": 60.0
      }
    }
  },
  {
    "id": "scenario-4",
    "scenario": "1500Image lazy，去text",
    "platform": "harmony",
    "device": "Mate80Pro",
    "renderMode": "自渲染",
    "artifacts": {
      "kmp": "2.2.21-1.2.0-04",
      "cmp": "1.9.2-1.2.0-07",
      "skiko": "0.9.22.2-1.2.0-09"
    },
    "values": {
      "1.2.0-07": {
        "response": 39.67,
        "completion": 68.86,
        "averageMemory": 190.37,
        "peakMemory": 201.42,
        "presentFence": 120.1,
        "rsFps": 120.21,
        "stableMemory": 123.2,
        "appInstructions": 3233709801.0,
        "renderInstructions": 5136299988.0
      },
      "1.2.0-02": {
        "response": 38.95,
        "completion": 69.45,
        "averageMemory": 190.1,
        "peakMemory": 197.15,
        "presentFence": 120.18,
        "rsFps": 120.24,
        "appInstructions": 3314183753.0,
        "renderInstructions": 5053687034.0
      },
      "1.1.0-13": {
        "response": 36.46,
        "completion": 69.8,
        "averageMemory": 202.97,
        "peakMemory": 211.08,
        "presentFence": 120.28,
        "rsFps": 120.3,
        "appInstructions": 3325704487.0,
        "renderInstructions": 5192203862.0
      },
      "1.1.0-06": {
        "response": 42.81,
        "completion": 70.88,
        "averageMemory": 204.74,
        "peakMemory": 214.22,
        "presentFence": 120.27,
        "rsFps": 120.21,
        "appInstructions": 3241921126.0,
        "renderInstructions": 5036283521.0
      },
      "0.5.0-28": {
        "response": 40.98,
        "completion": 70.07,
        "averageMemory": 208.41,
        "peakMemory": 219.75,
        "rsFps": 120.19,
        "appInstructions": 3309170129.0,
        "renderInstructions": 5195909378.0
      },
      "0.5.0-11": {
        "response": 40.99,
        "completion": 65.91,
        "averageMemory": 193.61,
        "peakMemory": 205.29,
        "averageFps": 120.22
      },
      "0.4.0-23": {
        "response": 40.33,
        "completion": 72.62,
        "averageMemory": 200.98,
        "peakMemory": 211.52,
        "averageFps": 120.22
      },
      "0.3.0-perf": {
        "response": 44.96,
        "completion": 77.13,
        "averageMemory": 199.87,
        "peakMemory": 213.13,
        "averageFps": 120.22,
        "appInstructions": 3697171887.0,
        "renderInstructions": 5075961625.0
      }
    }
  },
  {
    "id": "scenario-5",
    "scenario": "1500Image lazy，去text",
    "platform": "harmony",
    "device": "Mate80Pro",
    "renderMode": "统一渲染",
    "artifacts": {
      "kmp": "2.2.21-1.2.0-04",
      "cmp": "1.9.2-1.2.0-07",
      "skiko": "0.9.22.2-1.2.0-09"
    },
    "values": {
      "1.2.0-07": {
        "response": 41.68,
        "completion": 75.84,
        "averageMemory": 125.12,
        "peakMemory": 147.89,
        "presentFence": 118.28,
        "rsFps": 121.06,
        "stableMemory": 100.09,
        "appInstructions": 3010881941.0,
        "renderInstructions": 4906240421.0
      },
      "1.2.0-02": {
        "response": 42.7,
        "completion": 77.77,
        "averageMemory": 123.07,
        "peakMemory": 148.96,
        "presentFence": 117.65,
        "rsFps": 121.05,
        "appInstructions": 3116600447.0,
        "renderInstructions": 4996501251.0
      },
      "1.1.0-13": {
        "response": 44.4,
        "completion": 82.33,
        "averageMemory": 125.32,
        "peakMemory": 152.31,
        "presentFence": 118.83,
        "rsFps": 121.04,
        "appInstructions": 3147057309.0,
        "renderInstructions": 5093622633.0
      },
      "1.1.0-06": {
        "response": 45.2,
        "completion": 78.44,
        "averageMemory": 123.61,
        "peakMemory": 148.59,
        "presentFence": 119.37,
        "rsFps": 119.02,
        "appInstructions": 2566551797.0,
        "renderInstructions": 5165592047.0
      },
      "0.5.0-28": {
        "response": 41.25,
        "completion": 79.79,
        "averageMemory": 127.38,
        "peakMemory": 155.21,
        "rsFps": 117.25,
        "appInstructions": 2489934137.0,
        "renderInstructions": 4986825650.0
      },
      "0.5.0-11": {
        "response": 40.95,
        "completion": 77.93,
        "averageMemory": 121.49,
        "peakMemory": 144.43,
        "averageFps": 116.12
      },
      "0.4.0-23": {
        "response": 39.62,
        "completion": 74.77,
        "averageMemory": 116.99,
        "peakMemory": 140.2,
        "averageFps": 114.97
      },
      "0.3.0-perf": {
        "response": 41.52,
        "completion": 75.7,
        "averageMemory": 124.87,
        "peakMemory": 148.82,
        "averageFps": 115.13,
        "appInstructions": 2433402937.0,
        "renderInstructions": 4970442705.0
      }
    }
  },
  {
    "id": "scenario-6",
    "scenario": "1500Image lazy，去text",
    "platform": "ios",
    "device": "iOS",
    "renderMode": "默认",
    "artifacts": {
      "kmp": "2.2.21-0.5.0-14",
      "cmp": "1.9.2-0.5.0-28",
      "skiko": "0.9.22.2-0.5.0-28"
    },
    "values": {
      "1.2.0-07": {
        "response": 59.72,
        "completion": 116.67,
        "averageMemory": 123.63,
        "rsFps": 60.0
      },
      "1.2.0-02": {
        "response": 59.72,
        "completion": 116.67,
        "averageMemory": 123.63,
        "rsFps": 60.0
      },
      "1.1.0-13": {
        "response": 59.72,
        "completion": 116.67,
        "averageMemory": 123.63,
        "rsFps": 60.0
      },
      "1.1.0-06": {
        "response": 59.72,
        "completion": 116.67,
        "averageMemory": 123.63,
        "rsFps": 60.0
      },
      "0.5.0-28": {
        "response": 59.72,
        "completion": 116.67,
        "averageMemory": 123.63,
        "rsFps": 60.0
      },
      "0.5.0-11": {
        "response": 59.72,
        "completion": 116.67,
        "averageMemory": 123.63,
        "averageFps": 60.0
      },
      "0.4.0-23": {
        "response": 54.17,
        "completion": 115.28,
        "averageMemory": 121.19,
        "averageFps": 60.0
      },
      "0.3.0-perf": {
        "response": 58.38,
        "completion": 162.63,
        "averageMemory": 119.41,
        "averageFps": 60.0
      }
    }
  },
  {
    "id": "scenario-7",
    "scenario": "List 1000 lazy，去text",
    "platform": "harmony",
    "device": "Mate80Pro",
    "renderMode": "自渲染",
    "artifacts": {
      "kmp": "2.2.21-1.2.0-04",
      "cmp": "1.9.2-1.2.0-07",
      "skiko": "0.9.22.2-1.2.0-09"
    },
    "values": {
      "1.2.0-07": {
        "response": 40.69,
        "completion": 62.26,
        "averageMemory": 186.97,
        "peakMemory": 194.62,
        "presentFence": 120.13,
        "rsFps": 120.21,
        "stableMemory": 121.0,
        "appInstructions": 3784790094.0,
        "renderInstructions": 5163606075.0
      },
      "1.2.0-02": {
        "response": 39.5,
        "completion": 61.61,
        "averageMemory": 185.47,
        "peakMemory": 191.44,
        "presentFence": 120.17,
        "rsFps": 120.19,
        "appInstructions": 3869939093.0,
        "renderInstructions": 5153673556.0
      },
      "1.1.0-13": {
        "response": 40.83,
        "completion": 59.3,
        "averageMemory": 198.94,
        "peakMemory": 203.8,
        "presentFence": 120.38,
        "rsFps": 120.17,
        "appInstructions": 3987858408.0,
        "renderInstructions": 5226076760.0
      },
      "1.1.0-06": {
        "response": 48.35,
        "completion": 63.2,
        "averageMemory": 197.21,
        "peakMemory": 214.15,
        "presentFence": 119.91,
        "rsFps": 120.21,
        "appInstructions": 3846750265.0,
        "renderInstructions": 5084977889.0
      },
      "0.5.0-28": {
        "response": 43.11,
        "completion": 59.74,
        "averageMemory": 200.0,
        "peakMemory": 214.54,
        "rsFps": 120.1,
        "appInstructions": 3838826902.0,
        "renderInstructions": 5124163816.0
      },
      "0.5.0-11": {
        "response": 41.13,
        "completion": 57.65,
        "averageMemory": 192.03,
        "peakMemory": 197.29,
        "averageFps": 120.22
      },
      "0.4.0-23": {
        "response": 42.66,
        "completion": 58.34,
        "averageMemory": 194.88,
        "peakMemory": 202.01,
        "averageFps": 120.23
      },
      "0.3.0-perf": {
        "response": 47.96,
        "completion": 63.64,
        "averageMemory": 197.21,
        "peakMemory": 210.71,
        "averageFps": 120.17,
        "appInstructions": 4173899680.0,
        "renderInstructions": 5012028031.0
      }
    }
  },
  {
    "id": "scenario-8",
    "scenario": "List 1000 lazy，去text",
    "platform": "harmony",
    "device": "Mate80Pro",
    "renderMode": "统一渲染",
    "artifacts": {
      "kmp": "2.2.21-1.2.0-04",
      "cmp": "1.9.2-1.2.0-07",
      "skiko": "0.9.22.2-1.2.0-09"
    },
    "values": {
      "1.2.0-07": {
        "response": 44.64,
        "completion": 44.64,
        "averageMemory": 120.9,
        "peakMemory": 133.02,
        "presentFence": 118.45,
        "rsFps": 121.22,
        "stableMemory": 100.49,
        "appInstructions": 2837939319.0,
        "renderInstructions": 5287162484.0
      },
      "1.2.0-02": {
        "response": 44.25,
        "completion": 44.25,
        "averageMemory": 119.01,
        "peakMemory": 131.91,
        "presentFence": 117.55,
        "rsFps": 121.23,
        "appInstructions": 2949589101.0,
        "renderInstructions": 5343334275.0
      },
      "1.1.0-13": {
        "response": 42.43,
        "completion": 42.43,
        "averageMemory": 122.61,
        "peakMemory": 134.82,
        "presentFence": 118.67,
        "rsFps": 121.21,
        "appInstructions": 2925174779.0,
        "renderInstructions": 5431816040.0
      },
      "1.1.0-06": {
        "response": 44.08,
        "completion": 44.08,
        "averageMemory": 121.81,
        "peakMemory": 134.4,
        "presentFence": 119.23,
        "rsFps": 118.87,
        "appInstructions": 2519119244.0,
        "renderInstructions": 5456251684.0
      },
      "0.5.0-28": {
        "response": 43.36,
        "completion": 43.36,
        "averageMemory": 125.57,
        "peakMemory": 135.5,
        "rsFps": 118.18,
        "appInstructions": 2481587071.0,
        "renderInstructions": 5353825938.0
      },
      "0.5.0-11": {
        "response": 39.43,
        "completion": 41.28,
        "averageMemory": 118.25,
        "peakMemory": 128.53,
        "averageFps": 114.69
      },
      "0.4.0-23": {
        "response": 44.34,
        "completion": 44.34,
        "averageMemory": 113.06,
        "peakMemory": 123.24,
        "averageFps": 114.5
      },
      "0.3.0-perf": {
        "response": 44.99,
        "completion": 44.99,
        "averageMemory": 121.9,
        "peakMemory": 130.62,
        "averageFps": 114.81,
        "appInstructions": 2373832978.0,
        "renderInstructions": 5332098926.0
      }
    }
  },
  {
    "id": "scenario-9",
    "scenario": "List 1000 lazy，去text",
    "platform": "ios",
    "device": "iOS",
    "renderMode": "默认",
    "artifacts": {
      "kmp": "2.2.21-0.5.0-14",
      "cmp": "1.9.2-0.5.0-28",
      "skiko": "0.9.22.2-0.5.0-28"
    },
    "values": {
      "1.2.0-07": {
        "response": 63.89,
        "completion": 83.33,
        "averageMemory": 114.77,
        "rsFps": 60.0
      },
      "1.2.0-02": {
        "response": 63.89,
        "completion": 83.33,
        "averageMemory": 114.77,
        "rsFps": 60.0
      },
      "1.1.0-13": {
        "response": 63.89,
        "completion": 83.33,
        "averageMemory": 114.77,
        "rsFps": 60.0
      },
      "1.1.0-06": {
        "response": 63.89,
        "completion": 83.33,
        "averageMemory": 114.77,
        "rsFps": 60.0
      },
      "0.5.0-28": {
        "response": 63.89,
        "completion": 83.33,
        "averageMemory": 114.77,
        "rsFps": 60.0
      },
      "0.5.0-11": {
        "response": 63.89,
        "completion": 83.33,
        "averageMemory": 114.77,
        "averageFps": 60.0
      },
      "0.4.0-23": {
        "response": 62.5,
        "completion": 75.0,
        "averageMemory": 112.12,
        "averageFps": 60.0
      },
      "0.3.0-perf": {
        "response": 65.33,
        "completion": 79.23,
        "averageMemory": 112.58,
        "averageFps": 60.0
      }
    }
  },
  {
    "id": "scenario-10",
    "scenario": "1500View 非lazy，去text",
    "platform": "harmony",
    "device": "Mate80Pro",
    "renderMode": "自渲染",
    "artifacts": {
      "kmp": "2.2.21-1.2.0-04",
      "cmp": "1.9.2-1.2.0-07",
      "skiko": "0.9.22.2-1.2.0-09"
    },
    "values": {
      "1.2.0-07": {
        "response": 68.22,
        "completion": 91.92,
        "averageMemory": 205.05,
        "peakMemory": 212.24,
        "presentFence": 113.96,
        "rsFps": 120.2,
        "stableMemory": 130.21,
        "appInstructions": 32415342097.0,
        "renderInstructions": 4951171942.0
      },
      "1.2.0-02": {
        "response": 71.05,
        "completion": 91.17,
        "averageMemory": 203.21,
        "peakMemory": 215.0,
        "presentFence": 114.49,
        "rsFps": 120.21,
        "appInstructions": 34070330058.0,
        "renderInstructions": 4932593131.0
      },
      "1.1.0-13": {
        "response": 70.34,
        "completion": 92.46,
        "averageMemory": 205.0,
        "peakMemory": 213.74,
        "presentFence": 119.44,
        "rsFps": 120.25,
        "appInstructions": 34018557235.0,
        "renderInstructions": 4839051658.0
      },
      "1.1.0-06": {
        "response": 74.26,
        "completion": 90.79,
        "averageMemory": 210.08,
        "peakMemory": 221.6,
        "presentFence": 111.21,
        "rsFps": 120.21,
        "appInstructions": 34020781234.0,
        "renderInstructions": 4964096565.0
      },
      "0.5.0-28": {
        "response": 76.48,
        "completion": 93.97,
        "averageMemory": 210.34,
        "peakMemory": 223.07,
        "rsFps": 120.21,
        "appInstructions": 33846597484.0,
        "renderInstructions": 4875514558.0
      },
      "0.5.0-11": {
        "response": 77.24,
        "completion": 93.89,
        "averageMemory": 205.38,
        "peakMemory": 213.69,
        "averageFps": 115.74
      },
      "0.4.0-23": {
        "response": 78.93,
        "completion": 94.63,
        "averageMemory": 203.46,
        "peakMemory": 211.4,
        "averageFps": 120.22
      },
      "0.3.0-perf": {
        "response": 74.65,
        "completion": 92.16,
        "averageMemory": 197.45,
        "peakMemory": 209.72,
        "averageFps": 120.22,
        "appInstructions": 38578880220.0,
        "renderInstructions": 5154903513.0
      }
    }
  },
  {
    "id": "scenario-11",
    "scenario": "1500View 非lazy，去text",
    "platform": "harmony",
    "device": "Mate80Pro",
    "renderMode": "统一渲染",
    "artifacts": {
      "kmp": "2.2.21-1.2.0-04",
      "cmp": "1.9.2-1.2.0-07",
      "skiko": "0.9.22.2-1.2.0-09"
    },
    "values": {
      "1.2.0-07": {
        "response": 78.16,
        "completion": 78.16,
        "averageMemory": 129.82,
        "peakMemory": 142.4,
        "presentFence": 117.73,
        "rsFps": 120.88,
        "stableMemory": 111.05,
        "appInstructions": 31170160030.0,
        "renderInstructions": 7055068187.0
      },
      "1.2.0-02": {
        "response": 78.71,
        "completion": 78.71,
        "averageMemory": 126.94,
        "peakMemory": 141.68,
        "presentFence": 118.07,
        "rsFps": 121.03,
        "appInstructions": 32849820669.0,
        "renderInstructions": 7120391270.0
      },
      "1.1.0-13": {
        "response": 77.49,
        "completion": 77.49,
        "averageMemory": 129.9,
        "peakMemory": 145.0,
        "presentFence": 118.39,
        "rsFps": 120.87,
        "appInstructions": 33028900238.0,
        "renderInstructions": 7152541193.0
      },
      "1.1.0-06": {
        "response": 80.94,
        "completion": 80.94,
        "averageMemory": 128.59,
        "peakMemory": 146.09,
        "presentFence": 119.23,
        "rsFps": 119.18,
        "appInstructions": 32794389944.0,
        "renderInstructions": 7205245303.0
      },
      "0.5.0-28": {
        "response": 80.24,
        "completion": 80.24,
        "averageMemory": 130.83,
        "peakMemory": 149.28,
        "rsFps": 117.74,
        "appInstructions": 32515568598.0,
        "renderInstructions": 7094471587.0
      },
      "0.5.0-11": {
        "response": 81.45,
        "completion": 81.45,
        "averageMemory": 124.52,
        "peakMemory": 138.69,
        "averageFps": 102.89
      },
      "0.4.0-23": {
        "response": 84.76,
        "completion": 84.76,
        "averageMemory": 120.3,
        "peakMemory": 134.34,
        "averageFps": 112.22
      },
      "0.3.0-perf": {
        "response": 74.88,
        "completion": 74.88,
        "averageMemory": 128.57,
        "peakMemory": 142.29,
        "averageFps": 113.29,
        "appInstructions": 35755739459.0,
        "renderInstructions": 7004573777.0
      }
    }
  },
  {
    "id": "scenario-12",
    "scenario": "1500View 非lazy，去text",
    "platform": "ios",
    "device": "iOS",
    "renderMode": "默认",
    "artifacts": {
      "kmp": "2.2.21-0.5.0-14",
      "cmp": "1.9.2-0.5.0-28",
      "skiko": "0.9.22.2-0.5.0-28"
    },
    "values": {
      "1.2.0-07": {
        "response": 88.89,
        "completion": 101.39,
        "averageMemory": 118.88,
        "rsFps": 60.0
      },
      "1.2.0-02": {
        "response": 88.89,
        "completion": 101.39,
        "averageMemory": 118.88,
        "rsFps": 60.0
      },
      "1.1.0-13": {
        "response": 88.89,
        "completion": 101.39,
        "averageMemory": 118.88,
        "rsFps": 60.0
      },
      "1.1.0-06": {
        "response": 88.89,
        "completion": 101.39,
        "averageMemory": 118.88,
        "rsFps": 60.0
      },
      "0.5.0-28": {
        "response": 88.89,
        "completion": 101.39,
        "averageMemory": 118.88,
        "rsFps": 60.0
      },
      "0.5.0-11": {
        "response": 88.89,
        "completion": 101.39,
        "averageMemory": 118.88,
        "averageFps": 60.0
      },
      "0.4.0-23": {
        "response": 90.28,
        "completion": 100.0,
        "averageMemory": 118.09,
        "averageFps": 60.0
      },
      "0.3.0-perf": {
        "response": 101.47,
        "completion": 118.15,
        "averageMemory": 118.1,
        "averageFps": 60.0
      }
    }
  },
  {
    "id": "scenario-13",
    "scenario": "1500ViewWBg 非lazy，去text，加背景色",
    "platform": "harmony",
    "device": "Mate80Pro",
    "renderMode": "自渲染",
    "artifacts": {
      "kmp": "2.2.21-1.2.0-04",
      "cmp": "1.9.2-1.2.0-07",
      "skiko": "0.9.22.2-1.2.0-09"
    },
    "values": {
      "1.2.0-07": {
        "response": 69.2,
        "completion": 91.93,
        "averageMemory": 201.25,
        "peakMemory": 213.92,
        "presentFence": 114.89,
        "rsFps": 120.22,
        "stableMemory": 130.23,
        "appInstructions": 32285674476.0,
        "renderInstructions": 4765208898.0
      },
      "1.2.0-02": {
        "response": 71.51,
        "completion": 92.67,
        "averageMemory": 199.9,
        "peakMemory": 213.89,
        "presentFence": 113.28,
        "rsFps": 120.2,
        "appInstructions": 34086683007.0,
        "renderInstructions": 4970631238.0
      },
      "1.1.0-13": {
        "response": 72.75,
        "completion": 93.9,
        "averageMemory": 203.03,
        "peakMemory": 217.18,
        "presentFence": 117.4,
        "rsFps": 120.32,
        "appInstructions": 34419605208.0,
        "renderInstructions": 4982899411.0
      },
      "1.1.0-06": {
        "response": 78.04,
        "completion": 94.59,
        "averageMemory": 209.49,
        "peakMemory": 226.24,
        "presentFence": 111.59,
        "rsFps": 120.23,
        "appInstructions": 34179006655.0,
        "renderInstructions": 4959792841.0
      },
      "0.5.0-28": {
        "response": 76.04,
        "completion": 91.78,
        "averageMemory": 206.95,
        "peakMemory": 222.3,
        "rsFps": 120.19,
        "appInstructions": 33844390682.0,
        "renderInstructions": 4924049554.0
      },
      "0.5.0-11": {
        "response": 76.02,
        "completion": 91.75,
        "averageMemory": 204.27,
        "peakMemory": 210.39,
        "averageFps": 116.08
      },
      "0.4.0-23": {
        "response": 80.3,
        "completion": 95.94,
        "averageMemory": 200.16,
        "peakMemory": 208.81,
        "averageFps": 120.22
      },
      "0.3.0-perf": {
        "response": 74.06,
        "completion": 91.56,
        "averageMemory": 197.53,
        "peakMemory": 213.41,
        "averageFps": 120.22,
        "appInstructions": 38124876480.0,
        "renderInstructions": 5005825637.0
      }
    }
  },
  {
    "id": "scenario-14",
    "scenario": "1500ViewWBg 非lazy，去text，加背景色",
    "platform": "harmony",
    "device": "Mate80Pro",
    "renderMode": "统一渲染",
    "artifacts": {
      "kmp": "2.2.21-1.2.0-04",
      "cmp": "1.9.2-1.2.0-07",
      "skiko": "0.9.22.2-1.2.0-09"
    },
    "values": {
      "1.2.0-07": {
        "response": 77.89,
        "completion": 77.89,
        "averageMemory": 124.08,
        "peakMemory": 145.12,
        "presentFence": 117.97,
        "rsFps": 121.17,
        "stableMemory": 110.25,
        "appInstructions": 31093816665.0,
        "renderInstructions": 7108994841.0
      },
      "1.2.0-02": {
        "response": 75.23,
        "completion": 75.23,
        "averageMemory": 122.6,
        "peakMemory": 141.22,
        "presentFence": 117.95,
        "rsFps": 121.23,
        "appInstructions": 32661095758.0,
        "renderInstructions": 7083175302.0
      },
      "1.1.0-13": {
        "response": 77.32,
        "completion": 77.32,
        "averageMemory": 124.72,
        "peakMemory": 146.56,
        "presentFence": 117.9,
        "rsFps": 121.0,
        "appInstructions": 33003560719.0,
        "renderInstructions": 7192411723.0
      },
      "1.1.0-06": {
        "response": 80.13,
        "completion": 80.13,
        "averageMemory": 127.21,
        "peakMemory": 146.71,
        "presentFence": 119.07,
        "rsFps": 119.18,
        "appInstructions": 32901891074.0,
        "renderInstructions": 7193084009.0
      },
      "0.5.0-28": {
        "response": 78.76,
        "completion": 78.76,
        "averageMemory": 129.26,
        "peakMemory": 147.97,
        "rsFps": 118.25,
        "appInstructions": 32648172245.0,
        "renderInstructions": 6995519845.0
      },
      "0.5.0-11": {
        "response": 81.01,
        "completion": 81.01,
        "averageMemory": 119.74,
        "peakMemory": 139.28,
        "averageFps": 102.11
      },
      "0.4.0-23": {
        "response": 84.88,
        "completion": 84.88,
        "averageMemory": 117.62,
        "peakMemory": 124.64,
        "averageFps": 112.32
      },
      "0.3.0-perf": {
        "response": 77.16,
        "completion": 77.16,
        "averageMemory": 123.71,
        "peakMemory": 142.59,
        "averageFps": 113.61,
        "appInstructions": 35733294131.0,
        "renderInstructions": 7051167068.0
      }
    }
  },
  {
    "id": "scenario-15",
    "scenario": "1500ViewWBg 非lazy，去text，加背景色",
    "platform": "ios",
    "device": "iOS",
    "renderMode": "默认",
    "artifacts": {
      "kmp": "2.2.21-0.5.0-14",
      "cmp": "1.9.2-0.5.0-28",
      "skiko": "0.9.22.2-0.5.0-28"
    },
    "values": {
      "1.2.0-07": {
        "response": 94.44,
        "completion": 106.94,
        "averageMemory": 113.84,
        "rsFps": 60.0
      },
      "1.2.0-02": {
        "response": 94.44,
        "completion": 106.94,
        "averageMemory": 113.84,
        "rsFps": 60.0
      },
      "1.1.0-13": {
        "response": 94.44,
        "completion": 106.94,
        "averageMemory": 113.84,
        "rsFps": 60.0
      },
      "1.1.0-06": {
        "response": 94.44,
        "completion": 106.94,
        "averageMemory": 113.84,
        "rsFps": 60.0
      },
      "0.5.0-28": {
        "response": 94.44,
        "completion": 106.94,
        "averageMemory": 113.84,
        "rsFps": 60.0
      },
      "0.5.0-11": {
        "response": 94.44,
        "completion": 106.94,
        "averageMemory": 113.84,
        "averageFps": 60.0
      },
      "0.4.0-23": {
        "response": 84.72,
        "completion": 97.22,
        "averageMemory": 117.38,
        "averageFps": 60.0
      },
      "0.3.0-perf": {
        "averageFps": 60.0
      }
    }
  },
  {
    "id": "scenario-16",
    "scenario": "1500Text 非lazy",
    "platform": "harmony",
    "device": "Mate80Pro",
    "renderMode": "自渲染",
    "artifacts": {
      "kmp": "2.2.21-1.2.0-04",
      "cmp": "1.9.2-1.2.0-07",
      "skiko": "0.9.22.2-1.2.0-09"
    },
    "values": {
      "1.2.0-07": {
        "response": 296.3,
        "completion": 318.87,
        "averageMemory": 234.06,
        "peakMemory": 259.67,
        "presentFence": 111.66,
        "rsFps": 120.22,
        "stableMemory": 156.86,
        "appInstructions": 34082057362.0,
        "renderInstructions": 4685488404.0
      },
      "1.2.0-02": {
        "response": 333.4,
        "completion": 354.64,
        "averageMemory": 232.53,
        "peakMemory": 253.67,
        "presentFence": 109.85,
        "rsFps": 120.2,
        "appInstructions": 36394486013.0,
        "renderInstructions": 4810066132.0
      },
      "1.1.0-13": {
        "response": 330.28,
        "completion": 352.45,
        "averageMemory": 234.9,
        "peakMemory": 256.73,
        "presentFence": 113.1,
        "rsFps": 120.19,
        "appInstructions": 36511482277.0,
        "renderInstructions": 4906347782.0
      },
      "1.1.0-06": {
        "response": 349.33,
        "completion": 363.22,
        "averageMemory": 235.86,
        "peakMemory": 257.16,
        "presentFence": 112.06,
        "rsFps": 120.19,
        "appInstructions": 36066916872.0,
        "renderInstructions": 4794884345.0
      },
      "0.5.0-28": {
        "response": 350.09,
        "completion": 365.71,
        "averageMemory": 238.08,
        "peakMemory": 256.72,
        "rsFps": 120.22,
        "appInstructions": 35995456153.0,
        "renderInstructions": 4740687005.0
      },
      "0.5.0-11": {
        "response": 289.21,
        "completion": 306.77,
        "averageMemory": 234.76,
        "peakMemory": 253.8,
        "averageFps": 115.49
      },
      "0.4.0-23": {
        "response": 235.75,
        "completion": 252.4,
        "averageMemory": 249.97,
        "peakMemory": 254.7,
        "averageFps": 120.22
      },
      "0.3.0-perf": {
        "response": 393.94,
        "completion": 410.59,
        "averageMemory": 251.78,
        "peakMemory": 261.7,
        "averageFps": 120.22,
        "appInstructions": 40352001745.0,
        "renderInstructions": 4974510066.0
      }
    }
  },
  {
    "id": "scenario-17",
    "scenario": "1500Text 非lazy",
    "platform": "harmony",
    "device": "Mate80Pro",
    "renderMode": "统一渲染",
    "artifacts": {
      "kmp": "2.2.21-1.2.0-04",
      "cmp": "1.9.2-1.2.0-07",
      "skiko": "0.9.22.2-1.2.0-09"
    },
    "values": {
      "1.2.0-07": {
        "response": 611.42,
        "completion": 611.42,
        "averageMemory": 189.91,
        "peakMemory": 226.83,
        "presentFence": 117.68,
        "rsFps": 121.04,
        "stableMemory": 175.39,
        "appInstructions": 31322192801.0,
        "renderInstructions": 8988291645.0
      },
      "1.2.0-02": {
        "response": 583.55,
        "completion": 583.55,
        "averageMemory": 188.27,
        "peakMemory": 228.65,
        "presentFence": 117.59,
        "rsFps": 121.18,
        "appInstructions": 33369612514.0,
        "renderInstructions": 9122466273.0
      },
      "1.1.0-13": {
        "response": 588.74,
        "completion": 588.74,
        "averageMemory": 191.35,
        "peakMemory": 231.01,
        "presentFence": 118.16,
        "rsFps": 120.69,
        "appInstructions": 33587460681.0,
        "renderInstructions": 9256115088.0
      },
      "1.1.0-06": {
        "response": 517.76,
        "completion": 526.07,
        "averageMemory": 179.55,
        "peakMemory": 213.26,
        "presentFence": 118.6,
        "rsFps": 118.52,
        "appInstructions": 33645107105.0,
        "renderInstructions": 9335358364.0
      },
      "0.5.0-28": {
        "response": 570.78,
        "completion": 590.19,
        "averageMemory": 179.41,
        "peakMemory": 218.29,
        "rsFps": 118.23,
        "appInstructions": 32985530492.0,
        "renderInstructions": 9061204762.0
      },
      "0.5.0-11": {
        "response": 515.18,
        "completion": 526.62,
        "averageMemory": 187.31,
        "peakMemory": 214.73,
        "averageFps": 99.27
      },
      "0.4.0-23": {
        "response": 415.7,
        "completion": 431.43,
        "averageMemory": 199.51,
        "peakMemory": 209.84,
        "averageFps": 112.41
      },
      "0.3.0-perf": {
        "response": 581.61,
        "completion": 599.46,
        "averageMemory": 211.79,
        "peakMemory": 223.59,
        "averageFps": 113.13,
        "appInstructions": 36576131585.0,
        "renderInstructions": 9003264243.0
      }
    }
  },
  {
    "id": "scenario-18",
    "scenario": "1500Text 非lazy",
    "platform": "ios",
    "device": "iOS",
    "renderMode": "默认",
    "artifacts": {
      "kmp": "2.2.21-0.5.0-14",
      "cmp": "1.9.2-0.5.0-28",
      "skiko": "0.9.22.2-0.5.0-28"
    },
    "values": {
      "1.2.0-07": {
        "response": 166.67,
        "completion": 187.5,
        "averageMemory": 181.06,
        "rsFps": 60.0
      },
      "1.2.0-02": {
        "response": 166.67,
        "completion": 187.5,
        "averageMemory": 181.06,
        "rsFps": 60.0
      },
      "1.1.0-13": {
        "response": 166.67,
        "completion": 187.5,
        "averageMemory": 181.06,
        "rsFps": 60.0
      },
      "1.1.0-06": {
        "response": 166.67,
        "completion": 187.5,
        "averageMemory": 181.06,
        "rsFps": 60.0
      },
      "0.5.0-28": {
        "response": 166.67,
        "completion": 187.5,
        "averageMemory": 181.06,
        "rsFps": 60.0
      },
      "0.5.0-11": {
        "response": 166.67,
        "completion": 187.5,
        "averageMemory": 181.06,
        "averageFps": 60.0
      },
      "0.4.0-23": {
        "response": 152.78,
        "completion": 168.06,
        "averageMemory": 181.87,
        "averageFps": 60.0
      },
      "0.3.0-perf": {
        "response": 162.63,
        "completion": 179.31,
        "averageMemory": 181.03,
        "averageFps": 60.0
      }
    }
  },
  {
    "id": "scenario-19",
    "scenario": "1400TextWBg 非lazy，加背景色",
    "platform": "harmony",
    "device": "Mate80Pro",
    "renderMode": "自渲染",
    "artifacts": {
      "kmp": "2.2.21-1.2.0-04",
      "cmp": "1.9.2-1.2.0-07",
      "skiko": "0.9.22.2-1.2.0-09"
    },
    "values": {
      "1.2.0-07": {
        "response": 270.44,
        "completion": 291.84,
        "averageMemory": 230.87,
        "peakMemory": 250.59,
        "presentFence": 112.24,
        "rsFps": 120.2,
        "stableMemory": 155.33,
        "appInstructions": 31279391465.0,
        "renderInstructions": 4744045248.0
      },
      "1.2.0-02": {
        "response": 289.34,
        "completion": 312.43,
        "averageMemory": 230.12,
        "peakMemory": 250.79,
        "presentFence": 112.41,
        "rsFps": 120.19,
        "appInstructions": 32636647573.0,
        "renderInstructions": 4766157588.0
      },
      "1.1.0-13": {
        "response": 326.56,
        "completion": 349.61,
        "averageMemory": 233.15,
        "peakMemory": 254.33,
        "presentFence": 115.21,
        "rsFps": 120.23,
        "appInstructions": 32845270996.0,
        "renderInstructions": 4733804223.0
      },
      "1.1.0-06": {
        "response": 308.39,
        "completion": 325.01,
        "averageMemory": 233.16,
        "peakMemory": 255.02,
        "presentFence": 108.08,
        "rsFps": 120.22,
        "appInstructions": 32842868970.0,
        "renderInstructions": 4824199077.0
      },
      "0.5.0-28": {
        "response": 287.85,
        "completion": 303.54,
        "averageMemory": 235.11,
        "peakMemory": 256.39,
        "rsFps": 120.15,
        "appInstructions": 32623034267.0,
        "renderInstructions": 4831196153.0
      },
      "0.5.0-11": {
        "response": 273.39,
        "completion": 288.16,
        "averageMemory": 229.47,
        "peakMemory": 257.84,
        "averageFps": 116.08
      },
      "0.4.0-23": {
        "response": 215.77,
        "completion": 230.58,
        "averageMemory": 244.97,
        "peakMemory": 250.49,
        "averageFps": 120.17
      },
      "0.3.0-perf": {
        "response": 335.54,
        "completion": 351.24,
        "averageMemory": 243.26,
        "peakMemory": 255.15,
        "averageFps": 120.23,
        "appInstructions": 36966353490.0,
        "renderInstructions": 5023935838.0
      }
    }
  },
  {
    "id": "scenario-20",
    "scenario": "1400TextWBg 非lazy，加背景色",
    "platform": "harmony",
    "device": "Mate80Pro",
    "renderMode": "统一渲染",
    "artifacts": {
      "kmp": "2.2.21-1.2.0-04",
      "cmp": "1.9.2-1.2.0-07",
      "skiko": "0.9.22.2-1.2.0-09"
    },
    "values": {
      "1.2.0-07": {
        "response": 565.54,
        "completion": 565.54,
        "averageMemory": 184.73,
        "peakMemory": 212.62,
        "presentFence": 117.89,
        "rsFps": 120.72,
        "stableMemory": 171.07,
        "appInstructions": 28370774924.0,
        "renderInstructions": 10126197458.0
      },
      "1.2.0-02": {
        "response": 547.79,
        "completion": 547.79,
        "averageMemory": 182.47,
        "peakMemory": 214.56,
        "presentFence": 118.06,
        "rsFps": 121.05,
        "appInstructions": 30263188764.0,
        "renderInstructions": 10232070521.0
      },
      "1.1.0-13": {
        "response": 541.75,
        "completion": 541.75,
        "averageMemory": 182.82,
        "peakMemory": 217.18,
        "presentFence": 118.2,
        "rsFps": 120.99,
        "appInstructions": 31041996415.0,
        "renderInstructions": 10314194804.0
      },
      "1.1.0-06": {
        "response": 434.79,
        "completion": 434.79,
        "averageMemory": 167.57,
        "peakMemory": 194.93,
        "presentFence": 119.35,
        "rsFps": 119.38,
        "appInstructions": 30334412642.0,
        "renderInstructions": 17264041379.0
      },
      "0.5.0-28": {
        "response": 449.05,
        "completion": 449.05,
        "averageMemory": 168.65,
        "peakMemory": 198.25,
        "rsFps": 118.2,
        "appInstructions": 29756664280.0,
        "renderInstructions": 16994078214.0
      },
      "0.5.0-11": {
        "response": 403.03,
        "completion": 403.03,
        "averageMemory": 161.64,
        "peakMemory": 199.56,
        "averageFps": 106.12
      },
      "0.4.0-23": {
        "response": 317.35,
        "completion": 317.35,
        "averageMemory": 175.41,
        "peakMemory": 183.2,
        "averageFps": 113.16
      },
      "0.3.0-perf": {
        "response": 435.6,
        "completion": 435.6,
        "averageMemory": 186.18,
        "peakMemory": 205.95,
        "averageFps": 112.91,
        "appInstructions": 32614186010.0,
        "renderInstructions": 18514264936.0
      }
    }
  },
  {
    "id": "scenario-21",
    "scenario": "1400TextWBg 非lazy，加背景色",
    "platform": "ios",
    "device": "iOS",
    "renderMode": "默认",
    "artifacts": {
      "kmp": "2.2.21-0.5.0-14",
      "cmp": "1.9.2-0.5.0-28",
      "skiko": "0.9.22.2-0.5.0-28"
    },
    "values": {
      "1.2.0-07": {
        "response": 172.22,
        "completion": 184.72,
        "averageMemory": 173.03,
        "rsFps": 60.0
      },
      "1.2.0-02": {
        "response": 172.22,
        "completion": 184.72,
        "averageMemory": 173.03,
        "rsFps": 60.0
      },
      "1.1.0-13": {
        "response": 172.22,
        "completion": 184.72,
        "averageMemory": 173.03,
        "rsFps": 60.0
      },
      "1.1.0-06": {
        "response": 172.22,
        "completion": 184.72,
        "averageMemory": 173.03,
        "rsFps": 60.0
      },
      "0.5.0-28": {
        "response": 172.22,
        "completion": 184.72,
        "averageMemory": 173.03,
        "rsFps": 60.0
      },
      "0.5.0-11": {
        "response": 172.22,
        "completion": 184.72,
        "averageMemory": 173.03,
        "averageFps": 60.0
      },
      "0.4.0-23": {
        "response": 148.61,
        "completion": 162.5,
        "averageMemory": 172.21,
        "averageFps": 60.0
      },
      "0.3.0-perf": {
        "averageFps": 60.0
      }
    }
  },
  {
    "id": "scenario-22",
    "scenario": "仿淘宝页面",
    "platform": "harmony",
    "device": "Mate80Pro",
    "renderMode": "自渲染",
    "artifacts": {
      "kmp": "2.2.21-1.2.0-04",
      "cmp": "1.9.2-1.2.0-07",
      "skiko": "0.9.22.2-1.2.0-09"
    },
    "values": {
      "1.2.0-07": {
        "response": 57.39,
        "completion": 98.32,
        "averageMemory": 230.21,
        "peakMemory": 243.02,
        "presentFence": 119.89,
        "rsFps": 120.04,
        "stableMemory": 149.21,
        "appInstructions": 5251294147.0,
        "renderInstructions": 5089539579.0
      },
      "1.2.0-02": {
        "response": 61.93,
        "completion": 102.55,
        "averageMemory": 230.73,
        "peakMemory": 248.54,
        "presentFence": 119.51,
        "rsFps": 120.2,
        "appInstructions": 5346999423.0,
        "renderInstructions": 4982949228.0
      },
      "1.1.0-13": {
        "response": 59.13,
        "completion": 98.91,
        "averageMemory": 235.52,
        "peakMemory": 247.18,
        "presentFence": 120.07,
        "rsFps": 120.26,
        "appInstructions": 5325160642.0,
        "renderInstructions": 5161554802.0
      },
      "1.1.0-06": {
        "response": 62.43,
        "completion": 105.88,
        "averageMemory": 234.9,
        "peakMemory": 242.46,
        "presentFence": 119.38,
        "rsFps": 120.22,
        "appInstructions": 5187657955.0,
        "renderInstructions": 5083578343.0
      },
      "0.5.0-28": {
        "response": 73.65,
        "completion": 93.1,
        "averageMemory": 243.57,
        "peakMemory": 263.09,
        "rsFps": 120.1,
        "appInstructions": 5237716660.0,
        "renderInstructions": 5236189335.0
      },
      "0.5.0-11": {
        "response": 65.54,
        "completion": 83.07,
        "averageMemory": 228.64,
        "peakMemory": 253.15,
        "averageFps": 120.11
      },
      "0.4.0-23": {
        "response": 78.94,
        "completion": 88.16,
        "averageMemory": 240.55,
        "peakMemory": 264.89,
        "averageFps": 120.23
      },
      "0.3.0-perf": {
        "response": 87.4,
        "completion": 96.76,
        "averageMemory": 231.85,
        "peakMemory": 248.43,
        "averageFps": 120.17,
        "appInstructions": 5670904804.0,
        "renderInstructions": 5093407301.0
      }
    }
  },
  {
    "id": "scenario-23",
    "scenario": "仿淘宝页面",
    "platform": "harmony",
    "device": "Mate80Pro",
    "renderMode": "统一渲染",
    "artifacts": {
      "kmp": "2.2.21-1.2.0-04",
      "cmp": "1.9.2-1.2.0-07",
      "skiko": "0.9.22.2-1.2.0-09"
    },
    "values": {
      "1.2.0-07": {
        "response": 65.32,
        "completion": 100.55,
        "averageMemory": 183.19,
        "peakMemory": 203.91,
        "presentFence": 118.78,
        "rsFps": 121.21,
        "stableMemory": 132.43,
        "appInstructions": 3590111846.0,
        "renderInstructions": 5704203371.0
      },
      "1.2.0-02": {
        "response": 65.73,
        "completion": 102.91,
        "averageMemory": 179.26,
        "peakMemory": 199.81,
        "presentFence": 117.82,
        "rsFps": 121.07,
        "appInstructions": 3678408733.0,
        "renderInstructions": 5724038048.0
      },
      "1.1.0-13": {
        "response": 64.3,
        "completion": 102.97,
        "averageMemory": 180.38,
        "peakMemory": 199.7,
        "presentFence": 119.26,
        "rsFps": 121.17,
        "appInstructions": 3765721746.0,
        "renderInstructions": 5756674090.0
      },
      "1.1.0-06": {
        "response": 65.65,
        "completion": 97.99,
        "averageMemory": 179.79,
        "peakMemory": 202.06,
        "presentFence": 118.75,
        "rsFps": 118.68,
        "appInstructions": 3191775890.0,
        "renderInstructions": 5846438687.0
      },
      "0.5.0-28": {
        "response": 79.96,
        "completion": 86.46,
        "averageMemory": 164.89,
        "peakMemory": 183.8,
        "rsFps": 118.38,
        "appInstructions": 3080588080.0,
        "renderInstructions": 5733476561.0
      },
      "0.5.0-11": {
        "response": 75.21,
        "completion": 83.54,
        "averageMemory": 157.29,
        "peakMemory": 174.0,
        "averageFps": 114.45
      },
      "0.4.0-23": {
        "response": 72.33,
        "completion": 80.95,
        "averageMemory": 151.19,
        "peakMemory": 165.08,
        "averageFps": 111.41
      },
      "0.3.0-perf": {
        "response": 83.79,
        "completion": 91.19,
        "averageMemory": 149.08,
        "peakMemory": 165.84,
        "averageFps": 109.52,
        "appInstructions": 3041437994.0,
        "renderInstructions": 5703697875.0
      }
    }
  },
  {
    "id": "scenario-24",
    "scenario": "仿淘宝页面",
    "platform": "ios",
    "device": "iOS",
    "renderMode": "默认",
    "artifacts": {
      "kmp": "2.2.21-0.5.0-14",
      "cmp": "1.9.2-0.5.0-28",
      "skiko": "0.9.22.2-0.5.0-28"
    },
    "values": {
      "1.2.0-07": {
        "response": 93.75,
        "completion": 118.75,
        "averageMemory": 175.58,
        "rsFps": 60.0
      },
      "1.2.0-02": {
        "response": 93.75,
        "completion": 118.75,
        "averageMemory": 175.58,
        "rsFps": 60.0
      },
      "1.1.0-13": {
        "response": 93.75,
        "completion": 118.75,
        "averageMemory": 175.58,
        "rsFps": 60.0
      },
      "1.1.0-06": {
        "response": 93.75,
        "completion": 118.75,
        "averageMemory": 175.58,
        "rsFps": 60.0
      },
      "0.5.0-28": {
        "response": 93.75,
        "completion": 118.75,
        "averageMemory": 175.58,
        "rsFps": 60.0
      },
      "0.5.0-11": {
        "response": 93.75,
        "completion": 118.75,
        "averageMemory": 175.58,
        "averageFps": 60.0
      },
      "0.4.0-23": {
        "response": 95.83,
        "completion": 125.0,
        "averageMemory": 155.42,
        "averageFps": 60.0
      },
      "0.3.0-perf": {
        "response": 72.28,
        "completion": 87.57,
        "averageFps": 60.0
      }
    }
  }
];
