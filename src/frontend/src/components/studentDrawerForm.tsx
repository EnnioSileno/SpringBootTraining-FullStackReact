
import React, { useState } from 'react';
import {
    Drawer,
    Input, 
    Col, 
    Select, 
    Form, 
    Row, 
    Button,
    Spin
} from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { addNewStudent } from '../client';
import { LoadingOutlined } from '@ant-design/icons';
import { successNotification } from './notification';

type Props = {
    showDrawer: boolean,
    setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>,
    fetchStudents: () => void,
}

const {Option} = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const StudentDrawerForm = ({showDrawer, setShowDrawer, fetchStudents}: Props): JSX.Element => {
const [submitting, setSubmitting] = useState<boolean>(false);

    const onCLose = (): void => setShowDrawer(false);

    const onFinish = (student: any) => {
        setSubmitting(true);
        console.log(JSON.stringify(student, null, 2))
        addNewStudent(student)
            .then(() => {
                console.log('student added');
                fetchStudents();
                onCLose();
                successNotification('Student successfully added',
                `${student.name} was added to the system`);
            }).catch(console.log)
            .finally(() => setSubmitting(false));
    };

    const onFinishFailed = (errorInfo: ValidateErrorEntity<any>) => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Create new student"
        width={720}
        onClose={onCLose}
        open={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              requiredMark={true}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter student name'}]}
                    >
                        <Input placeholder="Please enter student name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, message: 'Please enter student email'}]}
                    >
                        <Input placeholder="Please enter student email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[{required: true, message: 'Please select a gender'}]}
                    >
                        <Select placeholder="Please select a gender">
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                            <Option value="OTHER">OTHER</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting && <Spin indicator={antIcon} />}
            </Row>
        </Form>
    </Drawer>
}

export default StudentDrawerForm;