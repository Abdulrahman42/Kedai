const  dateTime = time => {
    let Menit = Math.floor(time / 60);
    let Detik = time % 60;
    return Menit + ':' + Detik;
  };


  const toRupiah = number => {
    let rupiah = '';
    let revNumber = number
      .toString()
      .split('')
      .reverse()
      .join('');
    for (var i = 0; i < revNumber.length; i++)
      if (i % 3 == 0) rupiah += revNumber.substr(i, 3) + '.';
    return (
      'Rp. ' +
      rupiah
        .split('', rupiah.length - 1)
        .reverse()
        .join('')
    );
  };

  export { dateTime, toRupiah}