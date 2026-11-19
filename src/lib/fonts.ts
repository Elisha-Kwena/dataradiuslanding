import localFont from 'next/font/local';


export const anton = localFont({
  src: [
    {
      path: '../../public/fonts/Anton-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-anton-variable',
  display: 'swap',
});

export const oblisk = localFont({
  src:[
    {
      path:"../../public/fonts/OBLISK.otf",
      weight:'400',
      style:'normal'
    },
    
  ],
  variable:"--font-oblisk-variable",
  display:"swap"
})
export const akhirTahun = localFont({
  src: [
    {
      path: '../../public/fonts/AkhirTahun-lgLOe.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-akhirtahun-variable',
  display: 'swap',
});


export const autobusOmnibus = localFont({
  src: [
    {
      path: '../../public/fonts/AutobusOmnibus-K7127.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-autobus-variable',
  display: 'swap',
});


export const superShiny = localFont({
  src: [
    {
      path: '../../public/fonts/SuperShiny-0v0rG.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-supershiny-variable',
  display: 'swap',
});

export const earlybird = localFont({
  src:[
    {
      path:'../../public/fonts/EarlyBird-97nj.ttf',
      weight:'400',
      style:'normal'
    }
  ],
  variable: '--font-earlybird-variable',
  display: 'swap',
})
export const ibmblockserif = localFont({
  src:[
    {
      path:'../../public/fonts/IbmBlockSerif-RLrl.ttf',
      weight:'400',
      style:'normal'
    }
  ],
  variable: '--font-ibmblockserif-variable',
  display: 'swap',
})


export const fonts = {
  anton,
  akhirTahun,
  autobusOmnibus,
  superShiny,
  earlybird,
  ibmblockserif,
};