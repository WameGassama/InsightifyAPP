'use client';

import { formatNumber } from '@/utils/formatNumber';
import { CiUser, CiVideoOn } from 'react-icons/ci';
import { FiEye } from 'react-icons/fi';
import { IoIosStats } from 'react-icons/io';
import Details from '../details';
import LineChart from '../lineChart';
import { AreaConfig } from '@ant-design/plots';
import Stats from '../stats';
import { useState } from 'react';
import { CalculateGained } from '@/utils/calculateGained';

interface Summary {
  total: {
    subscribers: number;
    uploads: number;
    views: number;
  };
  daily: {
    [key: string]: number | string;
  }[];
}

const Summary = ({ total, daily }: Summary) => {
  const [stats, setStats] = useState('Total Subscribers');

  const data = CalculateGained(
    daily.slice(-8).map((day) => {
      return {
        date: day.date,
        value: day[stats.split(' ')[1].toLowerCase()],
      };
    })
  );

  const min = Math.min(...data.map((item) => item.value));
  const max = Math.max(...data.map((item) => item.value));

  const config: AreaConfig = {
    data: data,
    xField: 'date',
    yField: 'value',
    isStack: false,
    animation: true,
    startOnZero: true,
    smooth: true,
    legend: {
      offsetY: -6,
    },
    yAxis: {
      min: min,
      max: max <= 100 ? max + 5 : max + 100,
      tickCount: 6,
      label: {
        formatter: (v: string) => {
          if (Number(v) >= 1000000) {
            return `${(Number(v) / 1000000).toFixed(2)}M`;
          } else if (Number(v) >= 1000) {
            return `${(Number(v) / 1000).toFixed(2)}K`;
          } else {
            return v.toString();
          }
        },
      },
    },
    tooltip: {
      formatter: (data) => {
        return {
          name: `Gained ${stats.split(' ')[1]}`,
          value: data.value,
        };
      },
    },
    line: {
      color: '#0756FB',
    },
    areaStyle: () => {
      return {
        fill: `l(270) 0:#fff 0.2${'#0756FB'} 1:${'#0756FB'}`,
      };
    },
  };

  return (
    <Details
      id={'summary'}
      icon={{
        padding: 'p-4',
        component: <IoIosStats color="#0756FB" size={55} />,
      }}
      title={'Summary'}
    >
      <div className="grid grid-cols-3 gap-4 my-5 mb-10">
        <Stats
          name="Total Subscribers"
          icon={<CiUser size={20} />}
          value={formatNumber(total.subscribers)}
          stats={stats}
          setStats={setStats}
        />
        <Stats
          name="Total Uploads"
          icon={<CiVideoOn size={20} />}
          value={total.uploads}
          stats={stats}
          setStats={setStats}
        />
        <Stats
          name="Total Views"
          icon={<FiEye size={20} />}
          value={formatNumber(total.views)}
          stats={stats}
          setStats={setStats}
        />
      </div>
      <LineChart stats={stats.split(' ')[1]} config={config} />
    </Details>
  );
};

export default Summary;
