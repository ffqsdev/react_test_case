import React, { Component } from "react"
import { connect } from "react-redux"

import { getPeopleTableData } from "../actions/PeopleTableActions"

import { Table } from "reactstrap"


class PeopleTable extends Component {

    renderTable = () => {
        const { data, isFetching, error } = this.props.peopleTable

        if (isFetching) {
            return(
                <p>Loading...</p>
            )
        }

        if (error) {
            return(
                <p>Error: {error.message}</p>
            )
        }

        let rows = data.map((item, index) => (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.gender}</td>
                <td>{item.age}</td>
            </tr>
        ))

        return(
            <Table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        )
    }

    render() {
        return(
            <div className="people__table">
                {this.renderTable()}
            </div>
        )
    }

    componentDidMount() {
        this.props.getPeopleTableData()
    }

}

const mapStateToProps = store => {
    return {
        peopleTable: store.peopleTable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPeopleTableData: () => dispatch(getPeopleTableData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleTable)
