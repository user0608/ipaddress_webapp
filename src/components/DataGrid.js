import React from 'react'

export const DataGrid = ({ data = [] }) => {
    return (
        <div>
            <table className="mi-tabla">
                <thead>
                    <tr>
                        <th>Nº</th>
                        <th>Red</th>
                        <th>Mascara</th>
                        <th>Primera IP</th>
                        <th>Ultima IP</th>
                        <th>Broadcast</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((d) => (
                            <tr key={d.red}>
                                <td>{d.id}</td>
                                <td>{d.red}</td>
                                <td>{d.mask}</td>
                                <td>{d.first}</td>
                                <td>{d.last}</td>
                                <td>{d.broadcast}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}
