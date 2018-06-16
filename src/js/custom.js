Reveal.addEventListener( 'dynamic', function() {

  const html = `
    <h1>Dynamic slide</h1>
    <p>My paragraph</p>
    <p id="myparagraph"><i>Choose a color</i></p>
    <p>
        <button onclick="document.getElementById('myparagraph').style.color ='red'">Red</button>
        <button onclick="document.getElementById('myparagraph').style.color ='blue'">Blue</button>
    </p>
  `;

  document.getElementById('slide_seven_js').innerHTML = html;
}, false );
