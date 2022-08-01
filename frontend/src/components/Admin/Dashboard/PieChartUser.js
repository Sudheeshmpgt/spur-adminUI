import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

function PieChartUser({ datas}) {
    const value = ["Interviewer", "Interviewee"]
    return (
        <div style={{ width:'53%', margin:'3px auto' }}> 
            <Pie data={{
                labels: value,
                datasets: [
                    {
                        label: 'Bookings by Category',
                        data: datas,
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

export default PieChartUser