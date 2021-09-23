import React from 'react'

export const DataGridVLSM = ({ data = [] }) => {
    return (
        <div>
            <table className="mi-tabla">
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Host Requeridos</th>
                        <th>Host Obtenidos</th>
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
                                <td>{d.name}</td>
                                <td>{d.requiere}</td>
                                <td>{d.have}</td>
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
