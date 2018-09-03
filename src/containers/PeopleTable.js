import React, { Component, Fragment } from "react"
import { connect } from "react-redux"

import { getPeopleTableData } from "../actions/PeopleTableActions"

import { Table, Pagination, PaginationItem, PaginationLink } from "reactstrap"


class PeopleTable extends Component {
    state = {
        page: 0,
        perPage: 20,
        sortedBy: "",
        isReverse: false,
    }

    sortedData = (data, colname, isReverse) => {
        let sortedData = [...data]
        if (colname) {
            if (isReverse) {
                sortedData.sort((a, b) => (""+a[colname]).localeCompare(b[colname]))
            } else {
                sortedData.sort((a, b) => (""+b[colname]).localeCompare(a[colname]))
            }
        }
        return sortedData
    }

    changeSorted = (colname) => {
        let state = {sortedBy: colname}
        if (this.state.sortedBy === colname) {
            state.isReverse = this.state.isReverse ? false : true
        }
        this.setState(state)
    }

    changePage = (page) => {
        this.setState({page: page})
    }

    renderPagination = () => {
        const { data } = this.props.peopleTable
        const { page, perPage } = this.state

        let pages = Math.ceil(data.length/perPage)

        let template = []
        for(let i = 0; i < pages; i++) {
            template.push((
                <PaginationItem key={i} active={i === page}>
                    <PaginationLink href="#" onClick={() => this.changePage(i)}>{i + 1}
                    </PaginationLink>
                </PaginationItem>
            ))
        }
        return template
    }

    renderTable = () => {
        const { data, isFetching, error } = this.props.peopleTable
        const { page, perPage, sortedBy, isReverse} = this.state

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

        let rows = this.sortedData(data, sortedBy, isReverse).map((item, index) => {
            if (index >= page*perPage && index <= page*perPage + perPage) {
                return (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.gender}</td>
                        <td>{item.age}</td>
                    </tr>
                )
            }
            return null
        })

        return(
            <Fragment>
                <Table className="table">
                    <thead>
                        <tr>
                            <th onClick={() => this.changeSorted("")}>Index</th>
                            <th onClick={() => this.changeSorted("name")}>Name</th>
                            <th onClick={() => this.changeSorted("gender")}>Gender</th>
                            <th onClick={() => this.changeSorted("age")}>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
                <Pagination>
                    {this.renderPagination()}
                </Pagination>
            </Fragment>
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
