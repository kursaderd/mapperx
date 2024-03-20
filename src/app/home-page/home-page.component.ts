import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-15px)' }),
          stagger('50ms', animate('550ms ease-out', style({ opacity: 1, transform: 'translateY(0px)' }))),
        ], { optional: true })
      ])
    ])
  ]
})
export class HomePageComponent implements OnInit {
  @ViewChild('cardContent') cardContentRef!: ElementRef;
  @ViewChild('shadow') shadowRef!: ElementRef;

  sponsors = [
    { name: 'Directus', avatar: 'https://github.githubassets.com/assets/directus-4da9e46da0ac.png', href: '/directus', radius: '6px' },
    { name: 'Nick DeJesus', avatar: 'https://github.githubassets.com/assets/dayhaysoos-c50659cac73b.jpeg', href: '/dayhaysoos', radius: '50%' },
    { name: 'Evan You', avatar: 'https://github.githubassets.com/assets/yyx990803-e11c7b140b17.jpeg', href: '/yyx990803', radius: '50%' },
    { name: 'Nikema', avatar: 'https://github.githubassets.com/assets/prophen-da9b089d8a25.jpeg', href: '/prophen', radius: '50%' },
    { name: 'kazuya kawaguchi', avatar: 'https://github.githubassets.com/assets/kazupon-d7aeb7b8df20.jpeg', href: '/kazupon', radius: '50%' },
    { name: 'ESLint', avatar: 'https://github.githubassets.com/assets/eslint-33bd6140c37f.png', href: '/eslint', radius: '50%' },
    { name: 'curl', avatar: 'https://github.githubassets.com/assets/curl-24ff778d1afc.jpeg', href: '/curl', radius: '6px' },
    { name: 'Samuel', avatar: 'https://github.githubassets.com/assets/imolorhe-9d771b1d4332.jpeg', href: '/imolorhe', radius: '50%' },
    { name: 'Homebrew', avatar: 'https://github.githubassets.com/assets/homebrew-c7e38eeacb52.png', href: '/homebrew', radius: '50%' },
];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  onMouseMove(event: MouseEvent): void {
    const rect = this.cardContentRef.nativeElement.getBoundingClientRect();
  
    // Mouse'un kartın içinde olup olmadığını kontrol et
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
      this.clearRotate(); // Kartın dışındaysa dönüşü temizle
      return; // Fonksiyondan çık
    }
  
    const forceX = 600;
    const forceY = 600;
    const offsetY = ((event.clientY - rect.top) - this.cardContentRef.nativeElement.offsetHeight / 2) / forceY;
    const offsetX = -((event.clientX - rect.left) - this.cardContentRef.nativeElement.offsetWidth / 2) / forceX;
  
    // Kartın dönüşünü uygula
    this.renderer.setStyle(this.cardContentRef.nativeElement, 'transform', `rotateX(${offsetY}deg) rotateY(${offsetX}deg)`);
  
    // Gölge efektini uygula
    this.renderer.setStyle(this.shadowRef.nativeElement, 'opacity', '1');
    this.renderer.setStyle(this.shadowRef.nativeElement, 'top', `${event.clientY - rect.top - 560}px`);
    this.renderer.setStyle(this.shadowRef.nativeElement, 'left', `${event.clientX - rect.left - 100}px`);
  }
  
  rotateForward(): void {
    // Gölgeyi gizle
    this.renderer.setStyle(this.shadowRef.nativeElement, 'opacity', '0');
  }
  
  clearRotate(): void {
    // Dönüşü ve gölgeyi sıfırla
    if (this.cardContentRef && this.cardContentRef.nativeElement) {
      this.renderer.removeStyle(this.cardContentRef.nativeElement, 'transform');
    }
    if (this.shadowRef && this.shadowRef.nativeElement) {
      this.renderer.setStyle(this.shadowRef.nativeElement, 'opacity', '0');
    }
  }
  
}
