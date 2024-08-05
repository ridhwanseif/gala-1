import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { fetchCouncil, fetchMonth, fetchYear } from '../../api/upimajiFilterAPI';
import { Table, Tabs, Flex, Progress, Select, Spin, Alert } from 'antd';
import { UfauluWaKuandika, UfauluWaKuhesabu, UfauluWaKusoma, WastaniWaUfaulu } from '../../utils/Chart';
import { fetchMaelezoYaShule } from '../../api/takwimuAPI';
import { progressTowardsBenchMark } from './ReportFunctions';

export default function RipotiYaShule() {

  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [council, setCouncil] = useState();


  // Fetch setSchool
  const { data: years, isLoading: isLoadingYear, isError: isErrorYear } = useQuery('years', fetchYear);
  const { data: months, isLoading: isLoadingMonth, isError: isErrorMonth } = useQuery('months', fetchMonth);
  const { data: councils, isLoading: isLoadingCouncil, isError: isErrorCouncil } = useQuery('councils', fetchCouncil);

  const {
    data: maelezoYaShule,
    isLoading: isLoadingMaelezoYaShule,
    isError: isErrorMaelezoYaShule,
    error: fetchError,
  } =
    useQuery(['maelezoYaShule', year, month, council], fetchMaelezoYaShule, { enabled: !!council && !!year && !!month });

  const [size, setSize] = useState('small');

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
      dataIndex: 'wastani',
      key: 'wastani',
      render: (marks) => {
        const percentage = progressTowardsBenchMark(marks);
        return (
          <Flex gap="small" vertical>
            <Progress
              percent={percentage}
              percentPosition={{
                align: 'center',
                type: 'inner',
              }}
              size={[400, 20]}
            />
          </Flex>
        );
      },
    },
    {
      title: 'Wastani (Chini ya 300)',
      dataIndex: 'wastani',
      key: 'wastani',
    },

  ];

  const handleChangeCouncil = (value) => {
    setCouncil(value);
  };

  return (
    <>
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h5>Takuwimu nyengine</h5>
            </div>
            <div class="col-sm-6">
              <div className='row'>
                <div className='col-sm-12'>
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Nyumbani</a></li>
                    <li class="breadcrumb-item active">Takuwimu</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-4 float-right">
              <div className="form-group">
                <label>Chagua Halmashauri</label><br />
                {isLoadingCouncil ? (
                  <p>Loading...</p>
                ) : isErrorCouncil ? (
                  <p>Error loading Halmashauri.</p>
                ) : (

                  <Select
                    defaultValue="Chagua halmashauri"
                    style={{ width: 170 }}
                    onChange={handleChangeCouncil}
                    placeholder="--Chagua--"
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {councils?.map((c) => (
                      <Option key={c.id} value={c}>
                        {c}
                      </Option>
                    ))}
                  </Select>
                )}
              </div>

            </div>

            <div className="col-sm-4 float-right">
              <div className="form-group">
                <label>Mwezi</label><br />
                {isLoadingMonth ? (
                  <p>Loading...</p>
                ) : isErrorMonth ? (
                  <p>Error loading months.</p>
                ) : (
                  <Select
                    defaultValue="Chagua mwezi"
                    style={{ width: 170 }}
                    onChange={setMonth} // no need to wrap it with (e) => setYear(e.target.value)
                  >
                    {months?.map((m) => (
                      <Option key={m} value={m}>{m}</Option>
                    ))}
                  </Select>
                )}
              </div>
            </div>
            <div className="col-sm-2 float-right">
              <div className="form-group">
                <label>Mwaka</label><br />
                {isLoadingYear ? (
                  <p>Loading...</p>
                ) : isErrorYear ? (
                  <p>Error loading years.</p>
                ) : (
                  <Select
                    defaultValue="Chagua mwaka"
                    style={{ width: 170 }}
                    onChange={setYear} // no need to wrap it with (e) => setYear(e.target.value)
                  >
                    {years?.map((y) => (
                      <Option key={y} value={y}>{y}</Option>
                    ))}
                  </Select>
                )}
              </div>
            </div>
          </div>
        </div>


      </div>
      {/* /.content-header */}

      <section className="content">
        {fetchError && (
          <Alert className='flex-center' message="Error" description={fetchError.message} type="error" showIcon />
        )
        }
        <Spin spinning={isLoadingMaelezoYaShule} tip="Loading...">
          <div className='row my-2 mt-3'>
            <div className='col-12'>
              <h5 className='text-center'>
                Ripoti ya Halmashauri ya {council}
              </h5>
            </div>

            <hr />
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 dataScroll">
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
                        <Table
                          className='custom-table'
                          columns={columns1}
                          dataSource={maelezoYaShule}
                          rowKey="no" />
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
        </Spin>
      </section>
    </>
  )
}
