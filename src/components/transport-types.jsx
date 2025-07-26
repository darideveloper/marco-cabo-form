import { useEffect } from "react"
import PropTypes from 'prop-types'
import TransportType from "./transport-type"
import clsx from "clsx"

export default function TransportTypes({handleUpdateType, activeTransportType, transports}) {

  return (
    <section className={clsx("transport-types",
    "w-2/3",
    "mx-auto",
    "max-w-sm",
    "flex",
    "flex-col",
    "items-start",
    "justify-center", 
    "md:flex-row", 
    "md:w-full", 
    "md:max-w-none", 
    "md:gap-20",
    "md:items-center")}>

      {transports.map((transport) => (
        <TransportType
          key={transport.id}
          id={transport.id}
          text={transport.text}
          price={transport.price}
          handleUpdateType={handleUpdateType}
          transportType={activeTransportType} // submit active transport type to components
          initialActive={transport.initialActive}
        />
      ))}

    </section>
  )
}

TransportTypes.propTypes = {
  handleUpdateType: PropTypes.func.isRequired,
  activeTransportType: PropTypes.string.isRequired,
  transports: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    initialActive: PropTypes.bool.isRequired,
  })).isRequired,
}