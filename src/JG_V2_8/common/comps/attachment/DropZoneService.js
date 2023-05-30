import Dropzone from 'dropzone'
export function createDropZoneInstance(el, options) {
  // Dropzone.autoDiscover = false
  const dz = new Dropzone(el, options)
  console.log('dz', dz)
  /*dz.on('sending', function (file, xhr, formData) {
    // if (me.onSending) {
    // me.onSending(formData)
    // } else {
    // alert(file)
    console.log(file, xhr)
    //formData.append('file', file.dataURL)

    formData.append('t', 'fieldmanagementattach')
    formData.append('p', 'dropzone')
    formData.append('p1', 'USE_TEMP')
    //  }
  })*/
  dz.on('error', function (file, errorMessage) {
    alert(errorMessage)
  })
}
