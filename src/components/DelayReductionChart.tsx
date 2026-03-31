import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  Rectangle
} from 'recharts';

const data = [
  {
    name: 'Current (Paper)',
    hours: 168,
    label: '1 Week',
    color: '#7a9985', // muted
    tech: 'Paper-based manual tracking and physical sample transport.'
  },
  {
    name: 'Proposed (AI)',
    hours: 4,
    label: '4 Hours',
    color: '#3ddc84', // accent
    tech: 'AI-assisted symptom flagging and digital referral sync.'
  }
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-surface border border-border p-4 shadow-2xl rounded-sm min-w-[160px]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: data.color }} />
          <span className="font-mono text-[9px] text-muted uppercase tracking-[0.2em]">Delay Status</span>
        </div>
        <p className="text-text font-serif text-lg font-bold mb-1 leading-tight">
          {data.name}
        </p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-accent font-mono text-xl font-black">{payload[0].value}</span>
          <span className="text-muted font-mono text-[10px] uppercase tracking-wider">Hours</span>
        </div>
        <div className="mt-3 pt-3 border-t border-border/30">
          <p className="text-muted text-[10px] leading-relaxed italic mb-2">
            Equivalent to approximately <span className="text-text font-medium not-italic">{data.label}</span>
          </p>
          <div className="bg-bg/50 p-2 rounded-xs border border-border/20">
            <p className="text-muted text-[8px] uppercase tracking-widest mb-1 font-mono">Technology</p>
            <p className="text-text text-[10px] leading-tight">
              {data.tech}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const DelayReductionChart = () => {
  return (
    <div className="w-full h-[200px] mt-8 mb-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 40, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(61, 220, 132, 0.05)" horizontal={false} />
          <XAxis 
            type="number" 
            hide 
            domain={[0, 180]} 
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={120}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#8E9299', fontSize: '9px', fontFamily: 'Space Mono', fontWeight: 500 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(61, 220, 132, 0.05)' }} />
          <Bar 
            dataKey="hours" 
            radius={[0, 2, 2, 0]} 
            barSize={24}
            activeBar={<Rectangle stroke="#3ddc84" strokeWidth={1} fillOpacity={0.9} />}
            animationDuration={1000}
            animationEasing="ease-in-out"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList 
              dataKey="label" 
              position="right" 
              style={{ fill: '#e8f0eb', fontSize: '10px', fontFamily: 'Space Mono', fontWeight: 700 }}
              offset={10}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
