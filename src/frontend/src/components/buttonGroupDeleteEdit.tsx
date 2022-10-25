import { Popconfirm, Radio } from 'antd';

type Props = {
    deletionText: string
    handleDelete: () => void
    handleEdit: () => void
}

const ButtonGroupDeleteEdit: React.FC<Props> = ({ deletionText, handleDelete, handleEdit }): JSX.Element => {
    return (
        <Radio.Group>
            <Popconfirm
            title={deletionText}
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No" >
                <Radio.Button>Delete</Radio.Button>
            </Popconfirm>
            
            <Radio.Button onClick={handleEdit}>Edit</Radio.Button>
        </Radio.Group>
    );
}

export default ButtonGroupDeleteEdit;