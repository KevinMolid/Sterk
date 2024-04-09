import React from "react"
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <main>
            <div>
                <h1>404</h1>
                <p className="margin-bottom-1">Sorry, the page you were looking for was not found.</p>
                <Link to="/">
                    <button className="btn btn-primary">Return to home</button>
                </Link>
            </div>
        </main>
    )
}