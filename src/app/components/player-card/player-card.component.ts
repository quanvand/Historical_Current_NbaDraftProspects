import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Player } from '../../models/player.model';
import Chart from 'chart.js/auto'; // Import Chart.js

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnChanges {
  @Input() record!: Player; // Replace with your Player model or appropriate type

  radarChart: Chart | undefined; // Declare the radarChart variable

  ngOnChanges(changes: SimpleChanges) {
    if (changes['record']) {
      if (this.radarChart) {
        this.radarChart.destroy(); // Destroy the existing chart
      }
      this.updateChart(); // Recreate the chart with the new record data
    }
  }

  

  private updateChart() {
    // Player variables from the input record
    const adjqScoringRating = this.record['adjq scoring rating'] || 0;
    const adjqShotCreatorTreeRating = this.record['adjq shotcreator tree rating'] || 0;
    const adjqShootingRating = this.record['adjq shooting rating'] || 0;
    const adjqPlaymakingRating = this.record['adjq playmaking rating'] || 0;
    const adjqDefRating = this.record['adjq def rating'] || 0;
    const adjqRebRating = this.record['adjq rebounding rating'] || 0;
    const potentialRating = this.record['potential rating (l class improvement formula)'] || 0;

    const canvas = document.getElementById('radarChart') as HTMLCanvasElement;
    if (!canvas) {
      return;
    }

    // Reset canvas size to its default dimensions
    canvas.width = canvas.width; // Clears the canvas and resets dimensions


    // Radar chart configuration
    const ctx = (document.getElementById('radarChart') as HTMLCanvasElement)?.getContext('2d');
    if (ctx) {
      this.radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['Scoring', 'ShotCreate', 'Playmaking', 'Defense', 'Reb', 'Potential', 'Shoot'],
          datasets: [{
            label: 'Player Ratings',
            data: [
              adjqScoringRating,
              adjqShotCreatorTreeRating,             
              adjqPlaymakingRating,
              adjqDefRating,
              adjqRebRating,
              potentialRating,
              adjqShootingRating,
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Fill color
            borderColor: 'rgba(54, 162, 235, 1)',       // Border color
            borderWidth: 2
          }]
        },
        options: {
          responsive: true, // Ensure chart resizes properly
          maintainAspectRatio: false, // Allow custom height/width
          scales: {
            r: {
              suggestedMin: 0, // Minimum value for the chart
              suggestedMax: 100, // Maximum value for the chart
              grid: {
                circular: true, // Ensures grid lines are drawn as circles
                display: true, // Enables the grid lines
                color: 'rgba(255, 255, 255, 0.3)', // Lighter white for inner circles
              },
              ticks: {
                stepSize: 25, // Adds ticks at intervals of 20
                display: false, // Enables the ticks
                showLabelBackdrop: false, // Removes the background for labels
                color: 'rgba(255, 255, 255, 0.8)', // Light white for tick labels
                backdropColor: 'transparent', // Makes backdrop invisible
              },
              pointLabels: {
                display: true, // Show the labels
                font: {
                  size: 10,
                  weight: 'bold',
                },
                color: 'rgba(255, 255, 255, 0.8)', // Adjust label color
                callback: (label: string, index: number) => {
                  const values = [
                    adjqScoringRating,
                    adjqShotCreatorTreeRating,             
                    adjqPlaymakingRating,
                    adjqDefRating,
                    adjqRebRating,
                    potentialRating,
                    adjqShootingRating,
                  ];
                  return `${label}\n${values[index]}`;  // Append values next to labels
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false, // Display the legend
              position: 'top'
            },
            tooltip: {
              enabled: true // Enables tooltips
            }
          }
        }
        
        
      });
    }
  }
}
