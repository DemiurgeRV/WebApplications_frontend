import './BreadCrumbs.css'
import { FC } from 'react'
import React from 'react'
import { Link } from 'react-router-dom';

export interface BreadcrumbLink {
    label?: string;
    url: string;
  }

interface BreadcrumbsProps {
    crumbs: BreadcrumbLink[];
  }

const BreadCrumbs: FC<BreadcrumbsProps> = (props) => {
    const { crumbs } = props

    return (
        <div>
            <ul className='breadcrumbs'>
                {!!crumbs.length &&
                    crumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            {index === crumbs.length - 1 ? (<li>{crumb.label}</li>) 
                            : (<li><Link to={crumb.url || ""}>{crumb.label}</Link></li>)}
                               <li className="slash">/</li>
                        </React.Fragment>
                    ))}
            </ul>
        </div>
    )
}

export default BreadCrumbs