import Swal from 'sweetalert2'
import Input from './input'
import { useState } from 'react'
import { useContext } from 'react'

import SubmitBtn from './submit-btn'
import Spinner from './spinner'

import { validateVipCode } from '../api/vip-code'
import VipCodeContext from '../context/vip-code'
import clsx from 'clsx'

export default function VipCode() {

  const { vipCode, setVipCode, isVip, setIsVip } = useContext(VipCodeContext)
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e) {

    // Show spinner while loading
    setIsLoading(true)

    // Validate vip code with api
    validateVipCode(vipCode).then(isValid => {

      // Show alerts
      if (isValid) {
        Swal.fire(
          'Vip Code Validated!',
          'Now you have a free service',
          'success'
        )

        setIsVip (true)

      } else {
        Swal.fire(
          'Vip Code Invalid!',
          'Check your code and try again',
          'error'
        )

        setIsVip (false)
      }

      // Hide spinner
      setIsLoading(false)
    })
  }

  return (
    <div
      className={`
        vip-code
        container w-5/6
        flex items-center justify-start
        h-28
        mb-14 mt-10
        md:mt-0
      `}
    >
      {
        isLoading
          ?
          <Spinner
            size="s"
            alt={true}
          />
          :

          <fieldset
            className={`
              w-full
              flex items-start justify-center flex-col
              md:w-8/12 md:flex-row
              sm:w-10/12
              lg:w-5/12
            `}
          >
            <Input
              label='Do you have a code?'
              type="text"
              placeholder='12345'
              name='vipCode'
              value={vipCode}
              handleUpdate={(e) => setVipCode(e.target.value)}
              isRequired={false}
            />

            <div className={`
              wrapper-submit
              w-32
              md:mt-10 md:ml-5 
            `}>
              <SubmitBtn
                value='Apply'
                extraClass={`w-32 py-2`}
                type='button'
                onClick={(e) => handleSubmit(e)}
              />
            </div>
          </fieldset>

      }
    </div>
  )
}