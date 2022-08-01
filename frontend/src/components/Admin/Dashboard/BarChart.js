import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

function BarChart({data}) {
  const value = ["Post by interviewer", "Post by interviewees"] 
  return (
    <div style={{ width: '97%', marginLeft:'auto', marginRight:'auto', marginTop:'25px'}}>
            <Bar 
           options={{
            scales: {
                y: {
                    ticks: {
                        stepSize: 1,
                    },
                    beginAtZero:true,
                }
            },
        }}
            data={{
                labels: value,
                datasets: [
                    {
                        label: 'Posts',
                        data: data,
                        backgroundColor: [
                            '#FFCC99',
                            '#4EEE94',
                        ]
                    }
                ]
            }} />
        </div>
  )
}

export default BarChart