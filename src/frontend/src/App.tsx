import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
	LoadingOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import { Button, Empty, MenuProps, Table } from 'antd';
import { Breadcrumb, Layout, Menu, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import { getAllStudents } from './client';
import { IStudent, IUnfetchError, IUnfetchResponse } from './interfaces';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const columns = [
	{
		title: 'Id',
		dataIndex: 'id',
		key: 'id',
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
	},
	{
		title: 'Gender',
		dataIndex: 'gender',
		key: 'gender',
	},
];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const items: MenuItem[] = [
	getItem('Option 1', '1', <PieChartOutlined />),
	getItem('Option 2', '2', <DesktopOutlined />),
	getItem('User', 'sub1', <UserOutlined />, [
		getItem('Tom', '3'),
		getItem('Bill', '4'),
		getItem('Alex', '5'),
	]),
	getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
	getItem('Files', '9', <FileOutlined />),
];

const App: React.FC = (): any => {
	const [students, setStudents] = useState<IStudent[]>([]);
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const [isFetching, setIsFetching] = useState<boolean>(true);
	const hasToFetchTheFirstTime = useRef(true);

	const fetchStudents = () => {
		getAllStudents()
			.then((response: IUnfetchResponse) => {
				return response.json()
			})
			.then((students: IStudent[]) => {
				console.log(students);
				setStudents(students);
				setIsFetching(false);
			})
			.catch((reason: IUnfetchError) => {
				console.log(reason);
				setIsFetching(false);
			});
	}

	useEffect(() => {
		if (hasToFetchTheFirstTime.current) {
			hasToFetchTheFirstTime.current = false;
			fetchStudents();
		}
	}, []);

	const renderStudents = (): any => {
		if(isFetching) {
			return <Spin indicator={antIcon} />;
		}
		if(students.length <= 0) {
			return <Empty />;
		}
		return <Table
			columns={columns}
			dataSource={students}
			bordered
			title={() =>
			<Button type="primary" icon={<PlusOutlined />} size={"small"}>
				Add New Student
		  	</Button>}
			pagination={{ pageSize: 50}}
			scroll={{ y:240 }}
			rowKey={(student) => student.id }
		/>
	}

	return (
		<Layout style={{ minHeight: '100vh' }}>
		  <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
			<div className="logo" />
			<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
		  </Sider>
		  <Layout className="site-layout">
			<Header className="site-layout-background" style={{ padding: 0 }} />
			<Content style={{ margin: '0 16px' }}>
			  <Breadcrumb style={{ margin: '16px 0' }}>
				<Breadcrumb.Item>User</Breadcrumb.Item>
				<Breadcrumb.Item>Bill</Breadcrumb.Item>
			  </Breadcrumb>
			  <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
				{renderStudents()}
			  </div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>By Ennio Sileno</Footer>
		  </Layout>
		</Layout>
	  );
};

export default App;
