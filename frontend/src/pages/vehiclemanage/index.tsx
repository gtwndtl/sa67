import React, { useState, useEffect } from "react";
import {
  Space,
  Button,
  Col,
  Row,
  Divider,
  Card,
  message,
  Input,
  Popconfirm,
  Typography,
  List
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  AppstoreAddOutlined
} from "@ant-design/icons";
import { GetCars, DeleteCarById } from "../../services/https";
import { CarInterface } from "../../interfaces/ICar";
import { Link, useNavigate } from "react-router-dom";

// Inline styles
const styles = {
  fontFamily: 'Kanit, sans-serif',
  headerTitle: {
    fontSize: '36px',
  },
  addButton: {
    fontSize: '16px',
    backgroundColor: '#003366',
    color: '#fff',
    border: 'none',
  },
  searchInput: {
    fontSize: '16px',
  },
  carLicense: {
    fontSize: '18px',
  },
  listTitle: {
    fontSize: '16px',
  },
  listDescription: {
    fontSize: '14px',
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemContent: {
    flex: 1,
  },
  listItemActions: {
    display: 'flex',
    gap: '8px',
  },
  buttonMargin: {
    marginRight: '8px',
  },
  popconfirm: {
    '.ant-popover': {
      top: '50% !important',
      left: '50% !important',
      transform: 'translate(-50%, -50%) !important',
    },
  },
};

const { Title, Text } = Typography;

function VehicleManage() {
  const navigate = useNavigate();
  const [cars, setCars] = useState<CarInterface[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState('list'); // Default to 'list'
  const [messageApi, contextHolder] = message.useMessage();

  const getCars = async () => {
    let res = await GetCars();
    if (res.length > 0) {
      setCars(res);
      setFilteredCars(res); // Set initial filtered cars
    } else {
      setCars([]);
      setFilteredCars([]);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = cars.filter(car =>
        car.license_plate.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCars(filtered);
    } else {
      setFilteredCars(cars);
    }
  }, [searchTerm, cars]);

  const handleDelete = async (id: string) => {
    try {
      const res = await DeleteCarById(id);
      if (res) {
        messageApi.success("Car deleted successfully");
        getCars(); // Refresh the car list after deletion
      } else {
        messageApi.error("Failed to delete the car");
      }
    } catch (error) {
      messageApi.error("An error occurred while deleting the car");
    }
  };

  return (
    <>
      {contextHolder}
      <div
        style={{
          fontFamily: styles.fontFamily,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div className="vehicle-manage-container" style={{
          flex: 1,
          padding: '0px'
        }}>
          <Row className="header-row">
            <Col span={12}>
              <Title level={1} style={{ ...styles.headerTitle, fontFamily: styles.fontFamily }}>Car Management</Title>
            </Col>
            <Col span={12} className="header-actions">
              <Space>
                <Button
                  type="default"
                  icon={viewType === 'list' ? <AppstoreAddOutlined /> : <UnorderedListOutlined />}
                  onClick={() => setViewType(viewType === 'list' ? 'card' : 'list')}
                  style={{ fontFamily: styles.fontFamily }}
                >
                  {viewType === 'list' ? 'Card View' : 'List View'}
                </Button>
                <Link to="/vehiclemanage/create">
                  <Button type="primary" icon={<PlusOutlined />} style={styles.addButton}>
                    Add
                  </Button>
                </Link>
              </Space>
            </Col>
          </Row>
          <Divider />
          <Row className="search-row">
            <Col>
              <Input
                placeholder="ค้นหา"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ ...styles.searchInput, fontFamily: styles.fontFamily }}
                suffix={<SearchOutlined />}
              />
            </Col>
          </Row>
          <div className="list-or-card-container" style={{
            flex: 1,
            overflow: 'hidden' // Prevent scrollbar
          }}>
            {viewType === 'card' ? (
              <Row gutter={[16, 16]} style={{ margin: 0 }}>
                {filteredCars.map((car) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={car.ID}>
                    <Card
                      cover={
                        <img
                          src={car.picture}
                          alt="Car"
                          style={{ height: '180px', objectFit: 'cover', width: '100%', borderRadius: '8px' }}
                        />
                      }
                      style={{ backgroundColor: '#fff', color: '#003366', padding: '16px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                    >
                      <Card.Meta
                        title={<Text style={{ ...styles.carLicense, fontFamily: styles.fontFamily }}>{car.license_plate}</Text>}
                        description={<Text style={{ fontFamily: styles.fontFamily }}>{`${car.brands} - ${car.model_year}`}</Text>}
                      />
                      <div className="card-actions" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px',
                        marginTop: '16px'
                      }}>
                        <Button
                          type="primary"
                          icon={<EditOutlined />}
                          onClick={() => navigate(`/vehiclemanage/edit/${car.ID}`)}
                          style={{ backgroundColor: '#003366', color: '#fff', fontFamily: styles.fontFamily }}
                        >
                          Edit
                        </Button>
                        <Popconfirm
                          title="Are you sure to delete this car?"
                          onConfirm={() => handleDelete(car.ID)}
                          okText="Yes"
                          cancelText="No"
                          overlayClassName="custom-popconfirm"
                        >
                          <Button
                            type="dashed"
                            danger
                            icon={<DeleteOutlined />}
                            style={{ backgroundColor: '#FF0000', border: 'none', color: '#ffffff', fontFamily: styles.fontFamily }}
                          >
                            Delete
                          </Button>
                        </Popconfirm>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <List
                dataSource={filteredCars}
                renderItem={car => (
                  <List.Item
                    style={styles.listItem}
                    actions={[
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => navigate(`/vehiclemanage/edit/${car.ID}`)}
                        style={{ backgroundColor: '#003366', color: '#fff', fontFamily: styles.fontFamily }}
                      >
                        Edit
                      </Button>,
                      <Popconfirm
                        title="Are you sure to delete this car?"
                        onConfirm={() => handleDelete(car.ID)}
                        okText="Yes"
                        cancelText="No"
                        overlayClassName="custom-popconfirm"
                      >
                        <Button
                          type="dashed"
                          danger
                          icon={<DeleteOutlined />}
                          style={{ backgroundColor: '#FF0000', border: 'none', color: '#ffffff', fontFamily: styles.fontFamily }}
                        >
                          Delete
                        </Button>
                      </Popconfirm>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<img src={car.picture} alt="Car" style={{ height: '100px', objectFit: 'cover', width: '150px', borderRadius: '8px' }} />}
                      title={
                        <Text style={{ ...styles.listTitle, fontFamily: styles.fontFamily }}>{car.license_plate}</Text>
                      }
                      description={
                        <div>
                          <Text style={{ fontFamily: styles.fontFamily }}>จังหวัด: {car.province}</Text><br />
                          <Text style={{ fontFamily: styles.fontFamily }}>แบรนด์: {car.brands}</Text><br />
                          <Text style={{ fontFamily: styles.fontFamily }}>รุ่น: {car.models}</Text><br />
                          <Text style={{ fontFamily: styles.fontFamily }}>ปี: {car.model_year}</Text><br />
                          <Text style={{ fontFamily: styles.fontFamily }}>สี: {car.color}</Text><br />
                          <Text style={{ fontFamily: styles.fontFamily }}>เลขตัวถัง: {car.vehicle_identification_number}</Text><br />
                          <Text style={{ fontFamily: styles.fontFamily }}>เลขที่รย. : {car.vehicle_registration_number}</Text><br />
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </div>
        </div>
      </div>
      <style>
        {`
          .custom-popconfirm .ant-popover {
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
          }
        `}
      </style>
    </>
  );
}

export default VehicleManage;
