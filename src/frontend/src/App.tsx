import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
	LoadingOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import {
	Avatar,
	Badge, 
	Button, 
	Divider, 
	Empty, 
	MenuProps, 
	Table, 
	Tag 
} from 'antd';
import { Breadcrumb, Layout, Menu, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import { deleteStudent, getAllStudents } from './client';
import { IStudent, IUnfetchError, IUnfetchResponse } from './interfaces';
import './App.css';
import StudentDrawerForm from './components/studentDrawerForm';
import ButtonGroupDeleteEdit from './components/buttonGroupDeleteEdit';
import { errorNotification, successNotification } from './components/notification';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const TheAvatar: React.FC<any> = ({ studentName }): JSX.Element => {
	let nameString = String(studentName);
	let trim: string = nameString.trim();
	if (trim.length === 0) {
		return <Avatar icon={<UserOutlined />} />
	}
	const split = trim.split(" ");
	if (split.length === 1) {
		return <Avatar>{nameString.charAt(0)}</Avatar>
	}
	return <Avatar>
		{`${nameString.charAt(0)}${nameString.charAt(nameString.length - 1)}`}
	</Avatar>
}

const onDeleteStudent = (student: IStudent, callback: () => void) => {
	deleteStudent(student.id)
		.then(() => {
			console.log(`${student.name} deleted`);
			successNotification('Student successfully deleted',
				`${student.name} was deleted from the system`);
			callback();
		}).catch((reason: IUnfetchError) => {
			reason.errorObject.json().then(res => {
				console.log(res);
				errorNotification("There was an issue",
					`${res.message} [${res.status}] [${res.error}]`);
			});
		})
}

const columns = (fetchStudents: () => void) => [
	{
		title: '',
		dataIndex: 'avatar',
		key: 'avatar',
		render: (text: any, student: IStudent) => <TheAvatar studentName={student.name} />
	},
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
	{
		title: 'Actions',
		dataIndex: 'actions',
		key: 'actions',
		render: (text: any, student: IStudent) => <ButtonGroupDeleteEdit
			deletionText={`Are you sure to delete ${student.name}`}
			handleDelete={() => onDeleteStudent(student, fetchStudents)}
			handleEdit={() => console.log('Edit clicked')}
		/>
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
	const [showDrawer, setShowDrawer] = useState<boolean>(false);
	const hasToFetchTheFirstTime = useRef(true);

	const addStudentButton = <Button
		onClick={() => setShowDrawer(!showDrawer)}
		type="primary" icon={<PlusOutlined />} size={"small"}>
		Add New Student
	</Button>

	const fetchStudents = () => {
		getAllStudents()
			.then((response: IUnfetchResponse) => {
				return response.json()
			})
			.then((students: IStudent[]) => {
				console.log(students);
				setStudents(students);
			})
			.catch((reason: IUnfetchError) => {
				reason.errorObject.json().then(res => {
					console.log(res);
					errorNotification("There was an issue",
						`${res.message} [${res.status}] [${res.error}]`);
				});
			})
			.finally(() => {
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
		if (isFetching) {
			return <Spin indicator={antIcon} />;
		}
		return <>
			<StudentDrawerForm
				showDrawer={showDrawer}
				setShowDrawer={setShowDrawer}
				fetchStudents={fetchStudents}
			/>
			{students.length <= 0 ?
				(<>
					{addStudentButton}
					<Empty />
				</>)
				:
				(<>
					<Table
						columns={columns(fetchStudents)}
						dataSource={students}
						bordered
						title={() => (
							<>
								<Tag>Number of students</Tag>
								<Badge count={students.length} className="site-badge-count-4" />
								<br></br><br></br>
								{addStudentButton}
							</>
						)
						}
						pagination={{ pageSize: 50 }}
						scroll={{ y: '50vh' }}
						rowKey={(student) => student.id}
					/>
				</>)
			}
		</>
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
					<div className="site-layout-background" style={{ padding: 24, minHeight: '75vh' }}>
						{renderStudents()}
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					By Ennio Sileno
					<Divider>
						<a
							href='https://github.com/EnnioSileno/SpringBootTraining-FullStackReact'
							target='_blank'
							rel="noopener noreferrer"
						>
							Click here to see the Repository
						</a>
					</Divider>
				</Footer>
			</Layout>
		</Layout>
	);
};

export default App;
