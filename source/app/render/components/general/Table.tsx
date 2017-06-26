import { Component } from "react"
import React from "react"
import classNames from "classnames"

interface PropsType {
	children: any,
	columns: [string]
}

interface StateType {
	
}

export class Table extends Component<PropsType, StateType> {

	constructor(props: PropsType) {
		super(props)

		this.state = {
			
		}
	}

	componentDidMount() {

		

	}

    render() {

		return <div className="Table">

			<table>

				<thead>

					<tr>
						{this.props.columns.map((column) => {
							return <td key={column}>{column}</td>
						})}
					</tr>

				</thead>

				<tbody>

					{this.props.children}

				</tbody>

			</table>

		</div>

    }

}