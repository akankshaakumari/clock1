const rotate = (d) => `translate(-50%, 0) rotate(${d}deg)`;
const pad2 = (n) => String(n).padStart(2, '0');

const ticksEl   = document.getElementById('ticks');   // Tick marks container
const numbersEl = document.getElementById('numbers'); // Clock numbers container
const hourHand   = document.getElementById('hourHand');   // Hour hand
const minuteHand = document.getElementById('minuteHand'); // Minute hand
const secondHand = document.getElementById('secondHand'); // Second hand
const digital    = document.getElementById('digital');  // Digital clock text

for (let i = 0; i < 60; i++) { // 0 se 59 loop
  const t = document.createElement('div'); // Naya div create kiya
  t.className = 'tick' + (i % 5 === 0 ? ' hour' : ''); // Har 5th tick ko bold (hour mark)
  t.style.transform = `translateX(-50%) rotate(${i * 6}deg)`; // 360° / 60 = 6° per tick
  ticksEl.appendChild(t); // DOM me add kar diya
}

for (let n = 1; n <= 12; n++) {
  const el = document.createElement('div'); // Naya div
  el.className = 'num'; // Class add
  el.textContent = n;    // 1 to 12 number likh diya

  const angle = (n * 30) - 90; // 12 top pe ho, 30° per number
  const radius = 40;            // center se distance (%)
  const x = Math.cos(angle * Math.PI / 180) * radius;
  const y = Math.sin(angle * Math.PI / 180) * radius;

  el.style.left = `calc(50% + ${x}%)`;
  el.style.top  = `calc(50% + ${y}%)`;
  el.style.transform = 'translate(-50%, -50%)';

  numbersEl.appendChild(el); // DOM me add kar diya
}


function update() {
  const now = new Date(); // Current time liya
  const ms      = now.getMilliseconds(); 
  const seconds = now.getSeconds() + ms/1000; // smooth second hand
  const minutes = now.getMinutes() + seconds/60;
  const hours   = (now.getHours() % 12) + minutes/60;

    const secDeg  = seconds * 6; // 360/60
  const minDeg  = minutes * 6;
  const hourDeg = hours * 30;  // 360/12


    secondHand.style.transform = rotate(secDeg);
  minuteHand.style.transform = rotate(minDeg);
  hourHand.style.transform   = rotate(hourDeg);


    const H = pad2(now.getHours());
  const M = pad2(Math.floor(minutes % 60));
  const S = pad2(Math.floor(seconds % 60));
  digital.textContent = `${H}:${M}:${S}`; // Digital clock update


    requestAnimationFrame(update); // continuously update, smooth animation
}
requestAnimationFrame(update); // pehla call
