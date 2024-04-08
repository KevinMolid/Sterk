import React from "react"

export default function Badge({className, children}) {
    return (
        <div className={`badge ${className}`}>
              {children}
        </div>
    )
}