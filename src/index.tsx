import React from 'react'
import ReactDOM from 'react-dom/client'
import { Simple } from './examples/Simple'
import { TwoPage } from './examples/TwoPage'

const root = ReactDOM.createRoot(document.getElementById('root')!)

console.log(root)

root.render(
	<React.StrictMode>
		<Simple />
	</React.StrictMode>
)
