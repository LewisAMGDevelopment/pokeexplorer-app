import { Component, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Region {
  name: string;
  coordinates: {
    x: number;
    y: number;
  };
  description: string;
}

@Component({
  selector: 'app-region-map',
  templateUrl: './region-map.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class RegionMapComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @ViewChild('mapImage') mapImage!: ElementRef;
  @Output() regionSelected = new EventEmitter<string>();

  regions: Region[] = [
    { name: 'kanto', coordinates: { x: 847, y: 696 }, description: 'Kanto Region' },
    { name: 'johto', coordinates: { x: 709, y: 706 }, description: 'Johto Region' },
    { name: 'hoenn', coordinates: { x: 537, y: 740 }, description: 'Hoenn Region' },
    { name: 'sinnoh', coordinates: { x: 970, y: 365 }, description: 'Sinnoh Region' },
    { name: 'unova', coordinates: { x: 338, y: 523 }, description: 'Unova Region' },
    { name: 'kalos', coordinates: { x: 287, y: 337 }, description: 'Kalos Region' },
    { name: 'alola', coordinates: { x: 514, y: 906 }, description: 'Alola Region' },
    { name: 'galar', coordinates: { x: 149, y: 147 }, description: 'Galar Region' },
    { name: 'paldea', coordinates: { x: 156, y: 603 }, description: 'Paldea Region' }
  ];

  activeRegion: string | null = null;

  ngAfterViewInit() {
    this.mapImage.nativeElement.addEventListener('load', () => {
      this.adjustButtonPositions();
    });
    window.addEventListener('resize', () => this.adjustButtonPositions());
  }

  private adjustButtonPositions() {
    const container = this.mapContainer.nativeElement;
    const buttons = container.getElementsByClassName('region-button');
    const containerRect = container.getBoundingClientRect();

    Array.from(buttons).forEach((button, index) => {
      const region = this.regions[index];
      const x = (region.coordinates.x / 1280) * containerRect.width;
      const y = (region.coordinates.y / 995) * containerRect.height;
      
      (button as HTMLElement).style.left = `${x}px`;
      (button as HTMLElement).style.top = `${y}px`;
    });
  }

  onRegionClick(regionName: string) {
    this.activeRegion = regionName;
    this.regionSelected.emit(regionName);
  }

  onRegionHover(regionName: string) {
    this.activeRegion = regionName;
  }

  onRegionLeave() {
    this.activeRegion = null;
  }
}