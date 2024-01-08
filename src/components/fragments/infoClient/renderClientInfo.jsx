import React from 'react'

const RenderClientInfo = ({editedClient, handleClientChange, editedPatient, handlePatientChange}) => {
  return (
    <>
      <div>
        <div>
          <div className='bg-gray-200 p-4 grid grid-cols-3 gap-4'>
            <input
              type="text"
              name="membershipNum"
              value={editedClient.membershipNum}
              onChange={handleClientChange}
            />
            <input
              type="text"
              name="name"
              value={editedClient.name}
              onChange={handleClientChange}
            />
            <select name="payMethod" onChange={handleClientChange}>
              <option value="1">Local</option>
              <option value="2">Cobrador</option>
            </select>
          </div>
          <div className='bg-blue-200 p-4 grid grid-cols-3 gap-4 md:grid-cols-2'>
            <input
              type="text"
              name="address"
              value={editedClient.address}
              onChange={handleClientChange}
            />
            <input
              type="text"
              name="email"
              value={editedClient.email}
              onChange={handleClientChange}
            />
            <input
              type="text"
              name="phone"
              value={editedClient.phone}
              onChange={handleClientChange}
            />
          </div>
        </div>
        <div>
          <div className='bg-gray-200 p-4 grid grid-cols-3 gap-4'>
            <input
              type="text"
              name="namePatient"
              value={editedPatient.namePatient}
              onChange={handlePatientChange}
            />
            <input
              type="text"
              name="race"
              value={editedPatient.race}
              onChange={handlePatientChange}
            />
          </div>
          <div className='bg-blue-200 p-4 grid grid-cols-3 gap-4 md:grid-cols-2'>
            <input
              type="text"
              name="subRace"
              value={editedPatient.subRace}
              onChange={handlePatientChange}
            />
            <input
              type="text"
              name="size"
              value={editedPatient.size}
              onChange={handlePatientChange}
            />
            <input
              type="text"
              name="gender"
              value={editedPatient.gender}
              onChange={handlePatientChange}
            />
            <input
              type="text"
              name="identification"
              value={editedPatient.identification}
              onChange={handlePatientChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default RenderClientInfo;