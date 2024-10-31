'use client'

import { monthsOfYearOptions } from '@/constants';
import React, { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface Props {
    setSelectedMonth: (month: number) => void;
    selectedMonth: number;
}
const MonthSelection: React.FC<Props> = ({ setSelectedMonth, selectedMonth }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleMonthChange = (monthValue: number) => {
        setSelectedMonth(monthValue);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <div className='px-3 py-2 font-semibold text-white bg-blue-800 border-2 rounded-xl w-fit flex items-center gap-1 cursor-pointer' onClick={toggleDropdown}>
                <span>{monthsOfYearOptions[selectedMonth - 1].label}</span>
                <MdKeyboardArrowDown className='text-xl' />
            </div>
            {isOpen && (
                <div className="absolute mt-2 bg-white border rounded-md shadow-lg z-10">
                    {monthsOfYearOptions.map((month) => (
                        <div
                            key={month.value}
                            className={`px-4 py-2 cursor-pointer hover:bg-blue-200 ${selectedMonth === month.value ? 'bg-blue-300' : ''
                                }`}
                            onClick={() => handleMonthChange(month.value)}
                        >
                            {month.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MonthSelection