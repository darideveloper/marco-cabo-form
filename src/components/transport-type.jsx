import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// libs
import clsx from "clsx"

export default function TransportType({ id, text, price, handleUpdateType, transportType, initialActive }) {

  const [hover, setHover] = useState(false)

  function handleChange(e) {
    // Submit activate checked to parent
    handleUpdateType(id)
  }

  useEffect(() => {

    // Detect if label is hover
    const input = document.querySelector(`[id="${id}"]`)
    const label = input.parentNode
    label.addEventListener('mouseover', () => {
      setHover(true)
    })
    label.addEventListener('mouseout', () => {
      setHover(false)
    })

    // Active the initial active transport type
    if (initialActive) {
      handleUpdateType(id)
    }

  }, [])

  return (
    <div className={clsx(
      "transport-type",
      "w-full",
      "md:w-1/3")}>

      <div className="checkbox opacity-80 ms-3">
        <label htmlFor={id} className={clsx(
          "flex",
          "items-center",
          "justify-start",
          "mb-10",
          "md:justify-center",
          "cursor-pointer")}>

          <div className={clsx(
            "box",
            "border-2",
            "w-14",
            "h-8",
            "border-red",
            "flex",
            "items-center",
            "justify-center")}>
            {/* Activate this div when selected */}
            <div className={clsx(
              "inside",
              "bg-red",
              "w-8",
              "h-4",
              "transition-opacity",
              "duration-300")} style={{ opacity: transportType == id ? "1" : (hover ? "0.6" : "0") }}></div>
          </div>

          <div className={clsx(
            "text",
            "ms-5",
            "w-full",
            "block")}>
            <h3 className={clsx(
              "uppercase",
              "text-xl")}>{text}</h3>
            <div className={clsx(
              "price-wrapper",
              "hidden")}>
              <span className={clsx(
                "block")}>price</span>
              <span className={clsx(
                "price",
                "text-red",
                "font-bold",
                "text-2xl")}>{price}.00 USD</span>
            </div>
          </div>

        </label>

        <input type="radio" name="transport-type" className={clsx(
          "hidden",
          "no-collect")} 
          id={id}
          onChange={(e) => { handleChange(e) }} checked={transportType == id ? true : false}
          />

      </div>
    </div>
  )
}

TransportType.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  handleUpdateType: PropTypes.func.isRequired,
  transportType: PropTypes.string.isRequired,
  initialActive: PropTypes.bool.isRequired,
}