import React, { useRef, useState } from 'react'
import { useQuery } from 'react-query';
import { SearchOutlined } from '@ant-design/icons';
import { fetchCouncil, fetchMonth, fetchYear } from '../../api/upimajiFilterAPI';
import { fetchMwatwaraSchools } from '../../api/mtwaraSchooleAPI';
import { Space, Table, Tag, Tabs, Input, Button } from 'antd';
import { ChartBar, RipotiYaShuleChart, UfauluWaKuandika, UfauluWaKuhesabu, UfauluWaKusoma, WastaniWaUfaulu } from '../../utils/Chart';
import { fetchMaelezoYaShule } from '../../api/takwimuAPI';

export default function RipotiYaShule() {

  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [council, setCouncil] = useState();


  // Fetch setSchool
  const { data: years, isLoading: isLoadingYear, isError: isErrorYear } = useQuery('years', fetchYear);
  const { data: months, isLoading: isLoadingMonth, isError: isErrorMonth } = useQuery('months', fetchMonth);
  const { data: schools, isLoading: isLoadingSchool, isError: isErrorSchool } = useQuery('schools', fetchMwatwaraSchools);
  const { data: councils, isLoading: isLoadingCouncil, isError: isErrorCouncil } = useQuery('councils', fetchCouncil);

  const { data: maelezoYaShule, isLoading: isLoadingMaelezoYaShule, isError: isErrorMaelezoYaShule } =
    useQuery(['maelezoYaShule', year, month, council], fetchMaelezoYaShule, { enabled: !!council });


  // console.log(JSON.stringify(schoolReport, null, 2))



  const [size, setSize] = useState('small');
  const searchInput = useRef(null);

  const columns1 = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Jina la Shule',
      dataIndex: 'shule',
      key: 'shule',
    },
    {
      title: 'Maendeleo (%)',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: 'Wastani (Chini ya 300)',
      dataIndex: 'wastani',
      key: 'wastani',
    },

  ];
  const data1 = [
    {
      key: '1',
      name: '3',
      age: 32,
      address: '43',
      tags: '23',
    },
  ]


  return (
    <>
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h4>Ripoti ya Shule</h4>
            </div>
            <div class="col-sm-6">
              <div className='row'>
                <div className='col-sm-12'>
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active">DataTables</li>
                  </ol>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-sm-5 float-right">

                  <div className="form-group">
                    <label>Halmashauri</label>
                    {isLoadingCouncil ? (
                      <p>Loading...</p>
                    ) : isErrorCouncil ? (
                      <p>Error loading Halmashauri.</p>
                    ) : (
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setCouncil(e.target.value)
                        }}
                      >
                        <option selected="selected" >--Chagua--</option>
                        {councils?.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
                <div className="col-sm-4 float-right">
                  <div className="form-group">
                    <label>Mwezi</label>
                    {isLoadingMonth ? (
                      <p>Loading...</p>
                    ) : isErrorMonth ? (
                      <p>Error loading months.</p>
                    ) : (
                      <select
                        className="form-control"
                        onChange={(e) => setMonth(e.target.value)}
                      >
                        <option selected="selected" >--Chagua--</option>
                        {months.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
                <div className="col-sm-3 float-right">
                  <div className="form-group">
                    <label>Mwaka</label>
                    {isLoadingYear ? (
                      <p>Loading...</p>
                    ) : isErrorYear ? (
                      <p>Error loading years.</p>
                    ) : (
                      <select
                        className="form-control"
                        onChange={(e) => setYear(e.target.value)}
                      >
                        <option selected="selected" >--Chagua--</option>
                        {years?.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* /.content-header */}

      <section className="content">

        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Tabs
                defaultActiveKey="1"
                type="card"
                size={size}
                style={{
                  marginBottom: 32,
                }}
                items={[
                  {
                    label: 'Wastani wa ufaulu',
                    key: '1',
                    children: (
                      <WastaniWaUfaulu
                        year={year}
                        month={month}
                        council={council} />
                    ),
                  },
                  {
                    label: 'Ufaulu wa Kusoma',
                    key: '2',
                    children: (
                      <UfauluWaKusoma
                        year={year}
                        month={month}
                        council={council}
                      />
                    ),
                  },
                  {
                    label: 'Umahiri ya kuandika',
                    key: '3',
                    children: (
                      <UfauluWaKuandika
                        year={year}
                        month={month}
                        council={council}
                      />
                    ),
                  },
                  {
                    label: 'Umahiri ya kuhesabu',
                    key: '4',
                    children: (
                      <UfauluWaKuhesabu
                        year={year}
                        month={month}
                        council={council} />
                    ),
                  },
                  {
                    label: 'Maendeleo wa Shule',
                    key: '5',
                    children: (
                      <Table columns={columns1} dataSource={maelezoYaShule} />
                    ),
                  },
                ]}
              />
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}

        {/* <div className="container-fluid">
          <div className="row">
            <div className="col-12 h-6">
              <RipotiYaShuleChart
                month={month}
                year={year}
              />
            </div>
          </div>
        </div> */}

      </section>
    </>
  )
}
