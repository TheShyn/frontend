import React from 'react'
import { Outlet } from 'react-router-dom'

export default function LayoutAuth() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: 'center',
            height: '100vh',
            width:'100%',
            background:'url("https://wallpaperaccess.com/full/1759678.png")'
        }}>
            <Outlet />
        </div>
    )
}
