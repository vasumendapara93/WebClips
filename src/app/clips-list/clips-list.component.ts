import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ClipService } from '../services/clip.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css'],
  providers: [DatePipe]
})
export class ClipsListComponent implements OnInit, OnDestroy {
  @Input() scrollable = true

  constructor(public clipService: ClipService) {
    this.clipService.getClips()
  }

  ngOnInit(): void {
    if(this.scrollable){
    window.addEventListener('scroll', this.handlescroll)
    }
  }

  ngOnDestroy(): void {
    if(this.scrollable){
    window.removeEventListener('scroll', this.handlescroll)
    }
    this.clipService.pageClips = []
  }

  handlescroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement
    const { innerHeight } = window

    const bottomofWindow = Math.round(scrollTop) + innerHeight == offsetHeight

    if (bottomofWindow) {
      this.clipService.getClips()
    }
  }

}
