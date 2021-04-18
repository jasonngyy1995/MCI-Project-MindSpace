import { Component, OnInit } from '@angular/core';
import { Emotion } from '../emotion.model';
import { EmotionsService } from '../emotions.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // TODO: need update from user name
  name: string = 'User';
  loadedEmotions: Emotion[] = [];
  topFiveEmotions: Emotion[] = [];

  circlesPos = [
    { top: '8%', left: '35%' },
    { top: '28%', left: '16%' },
    { top: '28%', left: '53%' },
    { top: '53%', left: '50%' },
    { top: '38%', left: '32%' },
  ];

  constructor(
    private emotionsService: EmotionsService,
    public authService: AuthService
  ) {
    if (authService) {
      this.name = authService.userData.displayName;
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadedEmotions = this.emotionsService.emotions.sort(
      (a, b) => b.times - a.times
    );
    this.loadedEmotions = this.loadedEmotions.map((emotion) => {
      ///
      let transformed_size = 25 + emotion.times + '%';
      ///
      return { ...emotion, size: transformed_size };
    });
    this.topFiveEmotions = this.loadedEmotions.slice(0, 5);
  }
}
