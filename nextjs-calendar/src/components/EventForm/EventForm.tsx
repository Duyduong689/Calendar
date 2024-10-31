'use client'
import { Event } from '@/models/calendar.types'
import dayjs from 'dayjs'
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import { IoCloseCircle } from 'react-icons/io5'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { mutate } from 'swr'


interface Props {
    isShow: boolean
    setIsShow: Dispatch<SetStateAction<boolean>>
    data?: Event
}

const EventForm: React.FC<Props> = ({ isShow, setIsShow, data }) => {
    const [formData, setFormData] = useState<Event>({
        title: '',
        description: '',
        eventType: 'event',
        recurrenceType: 'none',
        startDateTime: new Date(),
        endDateTime: new Date(),
        themeColor: 'yellow',
    })


    const handleChangeFormData = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const start = dayjs(formData.startDateTime)
        const end = dayjs(formData.endDateTime)
        if (!formData.title) {
            toast.error('Title is required')
            return
        }

        if (!start.isBefore(end)) {
            toast.error('Start date must be before end date.')
            return
        }

        try {
            setIsShow(false);
            console.log("🚀 ~ handleSubmit ~ formData:", formData)
            const response = await fetch('/api/events', {
                method: formData.id ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Event created successfully!')
                mutate("fetchEventsByDate")
                mutate("fetchEvents")
                setFormData({
                    title: '',
                    description: '',
                    eventType: 'event',
                    recurrenceType: 'none',
                    startDateTime: new Date(),
                    endDateTime: new Date(),
                    themeColor: 'yellow',
                });
            } else {
                const errorData = await response.json();
                console.error('Failed to create event:', errorData);
                alert('Failed to create event');
            }
        } catch (error) {
            console.error('Error creating event:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const formatDateForInput = (date: Date) => {
        return date.toISOString().slice(0, 16);
    };

    const getDateValue = (date: Date | string) => {
        return typeof date === 'string' ? date : formatDateForInput(date as Date);
    };

    useEffect(() => {
        data && setFormData({
            ...data,
            startDateTime: new Date(data.startDateTime),
            endDateTime: new Date(data.endDateTime)
        })
    }, [data])

    return (
        <>
            <ToastContainer />
            {
                isShow &&
                <div className=' fixed w-screen h-screen bg-transparent z-10 inset-0'>
                    <div className='fixed min-w-[300px] min-h-[500px] bg-white rounded-md border-2 border-gray-300  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                        <div className=' flex px-2 py-2 items-center'>
                            <span className='text-xl flex-1 font-semibold'>{formData.id ? "Update Event" : "Create Event"}</span>
                            <IoCloseCircle className='cursor-pointer text-2xl text-red-800' onClick={() => setIsShow(false)} />
                        </div>
                        <form action="" className='py-2 px-4 flex gap-1 flex-col'>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name='title'
                                    value={formData.title}
                                    onChange={(e) => handleChangeFormData(e)}
                                    className="mt-1 p-2 w-full border rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name='description'
                                    value={formData.description}
                                    onChange={(e) => handleChangeFormData(e)}
                                    className="mt-1 p-2 w-full border rounded"
                                />
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <label className="block text-sm font-medium text-gray-700">Event Type</label>
                                <select
                                    value={formData.eventType}
                                    name='eventType'
                                    onChange={(e) => handleChangeFormData(e)}
                                    className="mt-1 p-2 w-full border rounded"
                                >
                                    <option value="event">Event</option>
                                    <option value="appointment">Appointment</option>
                                </select>
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <label className="block text-sm font-medium text-gray-700">Recurrence Type</label>
                                <select
                                    value={formData.recurrenceType}
                                    name='recurrenceType'
                                    onChange={(e) => handleChangeFormData(e)}
                                    className="mt-1 p-2 w-full border rounded"
                                >
                                    <option value="none">None</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date & Time</label>
                                <input
                                    type="datetime-local"
                                    name='startDateTime'
                                    value={getDateValue(formData.startDateTime)}
                                    onChange={(e) => handleChangeFormData(e)}
                                    className="mt-1 p-2 w-full border rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Date & Time</label>
                                <input
                                    type="datetime-local"
                                    name='endDateTime'
                                    value={getDateValue(formData.endDateTime)}
                                    onChange={(e) => handleChangeFormData(e)}
                                    className="mt-1 p-2 w-full border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Theme Color</label>
                                <select
                                    value={formData.themeColor}
                                    name='themeColor'
                                    onChange={(e) => handleChangeFormData(e)}
                                    className="mt-1 p-2 w-full border rounded"
                                >
                                    <option value="yellow">Yellow</option>
                                    <option value="blue">Blue</option>
                                    <option value="orange">Orange</option>
                                </select>
                            </div>
                            <div className='w-full text-white bg-blue-800 mt-2 rounded-md text-center p-2 cursor-pointer' onClick={handleSubmit}>
                                {formData.id ? "Update Event" : "Create Event"}
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default EventForm