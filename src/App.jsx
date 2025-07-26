import 'sweetalert2/src/sweetalert2.scss'

import Form from './sections/form'
import Load from './sections/load'

import Swal from 'sweetalert2'

function App() {

  // Show alert if thanks query param is present
  const urlParams = new URLSearchParams(window.location.search)
  const thanks = urlParams.get('thanks')
  if (thanks) {
    Swal.fire({
      icon: 'success',
      title: 'Thank you!',
      html: '<p>Your transportation has been reserved succesfully <br><br> You will receive a detailed email confirmation including arrival process at the airport and hotel departure time (for departure back to the airport) soon.</p>',
    })
  }

  return (
    <div className=''>
      <Form/>
      <Load/>
    </div>
  )
}

export default App
