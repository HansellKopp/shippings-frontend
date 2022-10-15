import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DefaultOptionType } from 'antd/lib/select';
import { AutoComplete, Button, Card, DatePicker, Form, Input, notification, PageHeader, Typography } from 'antd';
import { Shipment, useAddShipmentMutation } from './shipmentsApiSlice';
import { Client, useGetClientsQuery } from 'features/clients/clientsApiSlice';
import { ruleRequired } from 'utils';
import useTitle from 'hooks/useTitle';
import Paragraph from 'antd/lib/typography/Paragraph';
import { selectCurrentPage, setCurrentPage, setShipment } from './shipmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AddShipmentPage1 } from './addShipmentPage1';
import { AddShipmentHeader } from './addShipmentHeader';
import { AddShipmentDetails } from './AddShipmentDetails';

export const AddShipment = () => {
    useTitle('Add Shipment | Shopper Seguro')
    const page = (useSelector(selectCurrentPage) ||1) as string

    const pages = {
        '1': <AddShipmentHeader />,
        '2': <AddShipmentDetails />
    }
    
    const content = 
        <div className="max-w-screen-lg m-auto">
                {pages[`${page}`]}   
        </div>


    return content
}