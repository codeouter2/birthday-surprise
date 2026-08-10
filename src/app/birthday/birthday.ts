import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. Import CommonModule
import { FormsModule } from '@angular/forms';   // 2. Import FormsModule

@Component({
  selector: 'app-birthday',
  standalone: true, // 3. Enable standalone
  imports: [CommonModule, FormsModule], // 4. Add modules here
  templateUrl: './birthday.html',
  styleUrls: ['./birthday.css']
})
export class Birthday {
  @ViewChild('bgMusic') bgMusic!: ElementRef<HTMLAudioElement>;
@ViewChild('galleryAudio') galleryAudio!: ElementRef<HTMLAudioElement>;
  // Step state
  currentStep: number = 1;
  passcodeInput: string = '';
  errorMessage: boolean = false;
  isModalOpen: boolean = false;
  currentIndex: number = 0;
  isMobile: boolean = false; // Mobile detection flag

  // Step 3 state
  poppedBalloons: boolean[] = [false, false, false, false];
  poppedCount: number = 0;

  // Step 5 state
  isCandleBlown: boolean = false;

  // Step 6 state
  currentPhotoIndex: number = 0;
  isAnimating: boolean = false;
  memoryPhotos: string[] = [
    'pic2.jpeg',
    'pic1.jpeg',
    'pic3.jpeg'
  ];
  photoCaptions: string[] = [
    'That gorgeous smile ✨',
    'Unforgettable memories 💕',
    'Stay happiest always 🥳'
  ];

  // Step 7 state (Ensure all these variables are declared)
  isEnvelopeOpened: boolean = false;
  showFullPaper: boolean = false;
  typedText: string = '';
  isTyping: boolean = false;
fullLetterMessage: string = 
  "Happy Birthday, My Precious One... ❤️\n\n" +
  "Tula वाढदिवसाच्या मनापासून खूप खूप शुभेच्छा! 🎂✨\n" +
  "आज मी तुझ्या जवळ येऊ शकलो नाही याचं मला खूप वाईट वाटतंय, पण अंतर कितीही असलं तरी माझं मन आणि माझं प्रेम नेहमीच तुझ्या पाठीशी आहे. आजचा हा खास दिवस तुझ्या आयुष्यात अमर्याद आनंद घेऊन यावा, हीच माझी देवाकडे मनापासून प्रार्थना आहे.\n\n" +
  "तुला माहिती आहे का? तू केवळ सुंदरच नाहीस, तर तुझं मन इतकं निर्मळ आणि सुंदर आहे की तुझ्या एका हास्याने माझं पूर्ण जग उजळून निघतं. तुझं माझ्या आयुष्यात असणं ही माझ्यासाठी देवाने दिलेली सर्वात मोठी भेट आहे. आपलं हे नातं, आपली ही युनिक व्हाईब आणि आपल्यातील अतूट विश्वास माझ्यासाठी खूप खूप मौल्यवान आहे. हे बॉन्ड असंच कायम राहावं, अशी इच्छा आहे... 💫\n\n" +
  "आजकाल तुझ्या मनात जी काही काळजी, प्रॉब्लेम्स किंवा टेन्शन्स चालू आहेत ना... शांत हो, आता तू एकटी नाहीस. मी नेहमी तुझ्यासोबत आहे. तुझा प्रत्येक त्रास माझा आहे आणि तुझ्या प्रत्येक संघर्षात मी तुझ्या पाठीशी खंबीरपणे उभा राहीन. हळूहळू सगळं काही सुंदर होईल, मला तुझ्यावर आणि तुझ्या क्षमतेवर स्वतःपेक्षाही जास्त विश्वास आहे. तू तुझ्या आयुष्यात अशीच खूप खूप पुढे जावीस, तुझी सगळी स्वप्नं पूर्ण व्हावीत आणि तुझ्या चेहऱ्यावरचं हे गोड हासू कधीच कमी होऊ नये. 🌸\n\n" +
  "तू माझ्यासाठी काय आहेस, हे मांडायला मला हे शब्द खूप छोटे पडतात... पण आज मनापासून एक प्रॉमिस करतो, परिस्थिती कशीही असो, जग कुठल्याही वळणावर जाऊ दे, मी तुझा हात कधीच सोडणार नाही. शेवटपर्यंत तुझी सावली बनून तुझ्या पाठीशी उभा राहीन.\n\n" +
  "Once again, Happy Birthday, My Love... You mean the entire world to me. I Love You So Much! ❤️🥹";
  // Final overlay state
  isSurpriseFinished: boolean = false;

  // step 8
  isGiftOpened: boolean = false;

  // strp 9 : 
  proposalStep: number = 1; // 1 = Closed Gift, 2 = Walking Scene, 3 = Kneeling Proposal
  hasAccepted: boolean = false;

  // Step 10: 
  // Array of 12 Video Call Screenshots placed in public/ or src/assets/
  callPhotos = [
    { url: 'img1.jpeg', caption: 'Morning tea together ☕' },
    { url: 'img2.jpeg', caption: 'Late night giggles 🌙' },
    { url: 'img3.jpeg', caption: 'Mumbai ✈️ Nagpur vibes' },
    { url: 'img4.jpeg', caption: 'Your sweetest smile 🥰' },
    { url: 'img5.jpeg', caption: 'Making funny faces 😜' },
    { url: 'img6.jpeg', caption: 'Screen share dates 🎬' },
    { url: 'img7.jpeg', caption: 'Endless conversations 💬' },
    { url: 'img8.jpeg', caption: 'When you fell asleep 😴' },
    { url: 'img9.jpeg', caption: 'dinner together 😴' },
    { url: 'img10.jpeg', caption: 'Virtual hugs 🤗' },
    { url: 'img11.jpeg', caption: 'Counting down days ⏳' },
    { url: 'img12.jpeg', caption: 'My favorite person forever ❤️' }
  ];

  openGalleryModal(): void {
    if (this.bgMusic && this.bgMusic.nativeElement) {
      this.bgMusic.nativeElement.pause();
    }

    this.currentIndex = 0; // Reset to first photo
    this.isModalOpen = true;

    setTimeout(() => {
      if (this.galleryAudio && this.galleryAudio.nativeElement) {
        const audio = this.galleryAudio.nativeElement;
        audio.currentTime = 0;
        audio.volume = 0.8;
        audio.play().catch(err => console.warn('Autoplay error:', err));
      }
    }, 150);
  }

closeGalleryModal(): void {
    this.isModalOpen = false;
    if (this.galleryAudio && this.galleryAudio.nativeElement) {
      this.galleryAudio.nativeElement.pause();
    }
  }

  nextPhotos(): void {
    if (this.currentIndex < this.callPhotos.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to start
    }
  }

  prevPhoto(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.callPhotos.length - 1; // Loop to end
    }
  }

  // --- METHODS ---

  unlockSite(): void {
    if (this.passcodeInput.trim().toLowerCase() === 'tulip' || this.passcodeInput.trim().toLowerCase() === 'tulips') {
      this.errorMessage = false;
      this.currentStep = 2;
      this.playMusic();
    } else {
      this.errorMessage = true;
    }
  }

  playMusic(): void {
    if (this.bgMusic && this.bgMusic.nativeElement) {
      this.bgMusic.nativeElement.play().catch(() => {});
    }
  }

  goToBalloonScreen(): void {
    this.currentStep = 3;
  }

  goToGallaryScreen():void{
     this.currentStep = 9;
  }

  moveNoBtn(event: Event): void {
    const btn = event.target as HTMLElement;
    const randomX = Math.floor(Math.random() * 200) - 100;
    const randomY = Math.floor(Math.random() * 200) - 100;
    btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
  }

  popBalloon(index: number, event: MouseEvent | TouchEvent): void {
  if (!this.poppedBalloons[index]) {
    this.poppedBalloons[index] = true;
    this.poppedCount++;

    // Calculate click / tap coordinates for sparks
    let clickX = 0.5;
    let clickY = 0.5;

    if (event instanceof MouseEvent) {
      clickX = event.clientX / window.innerWidth;
      clickY = event.clientY / window.innerHeight;
    } else if (event.touches && event.touches[0]) {
      clickX = event.touches[0].clientX / window.innerWidth;
      clickY = event.touches[0].clientY / window.innerHeight;
    }

    // 1. Pop Sparkle Burst at exact balloon location
    this.triggerConfetti(35, { x: clickX, y: clickY }, ['#ffd700', '#ff7675', '#fd79a8', '#ffffff']);

    // 2. Grand celebration when all balloons are popped
    if (this.poppedCount === this.poppedBalloons.length) {
      setTimeout(() => {
        // Multi-stage celebratory confetti explosion
        this.triggerConfetti(150, { x: 0.5, y: 0.5 }, ['#ff0055', '#ffd700', '#74b9ff', '#55efc4', '#a29bfe']);
      }, 300);
    }
  }
}

  goToBouquetScreen(): void {
    this.currentStep = 4;
  }

  triggerFlowerConfetti(): void {
    this.triggerConfetti(60, { x: 0.5, y: 0.5 }, ['#ff7675', '#fd79a8', '#e84393']);
  }

goToNextSurprise(): void {
  this.currentStep = 5;
  this.playHbdSong();
}

playHbdSong(): void {
  if (this.bgMusic && this.bgMusic.nativeElement) {
    const audio = this.bgMusic.nativeElement;
    
    // Reset and attempt play
    audio.currentTime = 0;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was prevented; tapping anywhere on Step 5 will start it
        console.log('Autoplay prevented. Music will play on first click/tap.');
      });
    }
  }
}

blowOutCandle(): void {
  if (!this.isCandleBlown) {
    this.isCandleBlown = true;
    this.triggerConfetti(100, { x: 0.5, y: 0.4 }, ['#ff0055', '#ffd700', '#55efc4', '#74b9ff']);
    this.playHbdSong(); // Guarantees playback on candle tap
  }
}

  goToMemoryScreen(): void {
    this.currentStep = 6;
  }

  nextPhoto(): void {
    this.isAnimating = true;
    setTimeout(() => {
      this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.memoryPhotos.length;
      this.isAnimating = false;
    }, 200);
  }

  goToLetterScreen(): void {
    this.currentStep = 7;
  }

  openEnvelope(): void {
    this.isEnvelopeOpened = true;
    setTimeout(() => {
      this.showFullPaper = true;
      this.startTypewriter();
    }, 600);
  }

  startTypewriter(): void {
    this.typedText = '';
    this.isTyping = true;
    let i = 0;
    const speed = 40;

    const timer = setInterval(() => {
      if (i < this.fullLetterMessage.length) {
        this.typedText += this.fullLetterMessage.charAt(i);
        i++;
      } else {
        this.isTyping = false;
        clearInterval(timer);
      }
    }, speed);
  }

  finishSurprise(): void {
    this.currentStep=8;
    this.isSurpriseFinished = true;
    this.triggerConfetti(120, { x: 0.5, y: 0.5 }, ['#ff0055', '#ffd700', '#ffffff', '#a29bfe']);
  }

  triggerConfetti(particleCount: number, origin: { x?: number, y?: number }, colors: string[]): void {
    if (typeof (window as any).confetti === 'function') {
      (window as any).confetti({
        particleCount,
        spread: 70,
        origin,
        colors
      });
    }
  }

  // Open the final gift box
  openLastGift(): void {
    if (!this.isGiftOpened) {
      this.isGiftOpened = true;
      this.triggerConfetti(100, { x: 0.5, y: 0.4 }, ['#ff0055', '#ffd700', '#74b9ff', '#ffffff']);
    }
  }

  // Final celebration action
  finishEntireSurprise(): void {
    this.isSurpriseFinished = true;
    this.triggerConfetti(200, { x: 0.5, y: 0.5 }, ['#ff0055', '#ffd700', '#ffffff', '#a29bfe', '#ff758f']);
  }

  // Triggered when clicking the gift box on Step 8
  openProposalGift(): void {
    this.proposalStep = 2; // Shows walking cartoon scene
    this.triggerConfetti(50, { x: 0.5, y: 0.5 }, ['#ff0055', '#ffd700', '#ffccd5']);
  }

  // Triggered when clicking "Listen To My Heart"
  kneelAndPropose(): void {
    this.proposalStep = 3; // Bends on knee with tulips
    this.triggerConfetti(80, { x: 0.5, y: 0.4 }, ['#ff0055', '#ffffff', '#ff758f']);
  }

  // Triggered when she clicks "YES! Forever Yours!"
  acceptProposal(): void {
    this.hasAccepted = true;
    // Grand celebration confetti burst
    this.triggerConfetti(180, { x: 0.5, y: 0.5 }, ['#ff0055', '#ffd700', '#ffffff', '#a29bfe', '#ff758f']);
  }

  ngOnInit(): void {
    this.checkDevice();
  }

  // Detects mobile user agents or screen width under 768px
  checkDevice(): void {
    const userAgent = navigator.userAgent || navigator.vendor;
    const isMobileDevice = /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent.toLowerCase());
    const isSmallScreen = window.innerWidth < 768;

    if (isMobileDevice || isSmallScreen) {
      this.isMobile = true;
    }
  }
}

