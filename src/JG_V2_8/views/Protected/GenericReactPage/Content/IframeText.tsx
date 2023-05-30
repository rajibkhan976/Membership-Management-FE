const IFrematES = () => {
  const myFunction = () => {
    // var iframe = document.getElementById('myFrame')
    // /* @ts-ignore */
    // var elmnt = iframe.contentWindow.document.getElementsByTagName('H1')[0]
    // elmnt.style.display = 'none'
    console.log('first')
  }

  const handleClick = () => {
    console.log('Clicked')
  }

  return (
    <>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <iframe
        title="asd"
        id="myFrame"
        src="https://www.lipsum.com/"
        style={{ height: '400px', width: '900px' }}
      ></iframe>

      <p>Click the "Tryit" button to hide the first H1 element in the iframe (another document).</p>
      <p onClick={() => handleClick()}>Try it</p>
    </>
  )
}

export default IFrematES
