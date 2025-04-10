import React, { useState } from 'react'
import calorie from '../assets/Images/Small_projects/Calorie.jpg'
import { FaCalculator } from 'react-icons/fa'
import styled from 'styled-components'

const H6 = styled.h6`
    font-size: clamp(.7rem, 2vw, 1rem);
`
const Button = styled.button`
    font-size: clamp(.5rem, 2.5vw, 1rem);
    padding: clamp(.25rem, 1vw, .3rem) clamp(.25rem, 2vw, .5rem);
`

const Calorie = () => {

    // Result useState()
    const [calorieResult, setCalorieResult] = useState(null)

    // Preference useState()
    const [selectedGoal, setSelectedGoal] = useState('')
    const [selectedUnit, setSelectedUnit] = useState('')
    const [selectedGender, setSelectedGender] = useState('')

    // user details useState()
    const [weight, setWeight] = useState('')
    const [heightFt, setHeightFt] = useState('')
    const [heightIn, setHeightIn] = useState('')
    const [age, setAge] = useState('')
    const [range, setRange] = useState(0)

    // Submit Form
    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page reload

        const w = Number(weight);
        const h = Number(heightFt) * 12 + Number(heightIn)
        const a = Number(age)

        if ([w, h, a].some(val => isNaN(val) || val <= 0)) {
            alert('Please enter valid numbers for weight, height or age 😮')
            return
        }

        // Convert weight form lbs to kg if unit is kg 
        const weightInKg = selectedUnit === 'Kg' ? w : w * 0.453592;
        const heightInCm = h * 2.54 // Convert Inches to Centimeter

        // BMR Calculation
        let bmr;
        if (selectedGender === 'Male') {
            bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * a + 5;
        }
        else if (selectedGender === 'Female') {
            bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * a - 161;
        }
        else {
            alert('Please select gender 😮‍💨')
            return
        };

        // Determine active multiplier
        let activityMultiplier = 1.2
        if (range <= 2) activityMultiplier = 1.2;
        else if (range <= 5) activityMultiplier = 1.375;
        else if (range <= 10) activityMultiplier = 1.55;
        else if (range <= 14) activityMultiplier = 1.725;
        else activityMultiplier = 1.9;

        let resultOfCalories = bmr * activityMultiplier

        // Adjust the goal
        if (selectedGoal === 'Lose Fat') {
            resultOfCalories -= 500;
        }
        else if (selectedGoal === 'Gain Muscle') {
            resultOfCalories += 500;
        }

        setCalorieResult(Math.round(resultOfCalories))

        setSelectedGoal('');
        setSelectedUnit('');
        setSelectedGender('');
        setWeight('');
        setHeightFt('');
        setHeightIn('');
        setAge('');
        setRange(0);
    }


    // Option Row about user preference
    const OptionalRow = ({ label, options, selected, onChange }) => (
        <div className=" w-full lg:w-5/6 flex items-center justify-between">
            <H6 className="">{label}</H6>
            <div className=" w-5/6 h-full py-2 flex items-center justify-around rounded bg-gray-200">
                {options.map((opt, i) => (
                    <Button
                        key={i}
                        onClick={() => onChange(opt)}
                        type='button'
                        className='btn bg-white'>
                        {opt}
                    </Button>
                ))}
                <span className='text-purple-800 font-bold'>{selected ? selected : ''}</span>
            </div>
        </div>
    )

    return (
        <>
            <section className="calorie w-dvw h-dvh flex lg:items-center justify-center p-2">
                <main className=" w-lg md:w-xl lg:w-11/12 xl:w-3/4 lg:h-5/6 xl:h-3/4 flex flex-col lg:flex-row items-center gap-1 shadow-2xl rounded-2xl">
                    {/* Image container - left side */}
                    <div className="img-container w-1/1 lg:w-2/6 lg:h-full rounded-t-2xl lg:rounded-l-2xl overflow-hidden border">
                        <img className="size-full" src={calorie} />
                        <div className="img-content w-full lg:w-3/4 flex flex-col items-center justify-center gap-3 lg:gap-2 text-white">
                            <h1 className="!text-7xl font-sans">{calorieResult ?? '----'}</h1>
                            <h5 className="!font-extrabold">ESTIMATED CALORIES</h5>
                            <p className="">For Losing Body Fat🫡</p>
                        </div>
                    </div>
                    {/* Content Container - Right side */}
                    <div className="content-container w-1/1 lg:w-4/6 h-full flex flex-col items-center gap-3 rounded-b-2xl lg:rounded-r-2xl px-1 pb-1">
                        {/* Heading */}
                        <div className="heading flex items-center justify-center gap-3 ">
                            <label className='calc-icon'><FaCalculator className=' text-3xl lg:text-5xl' /></label>
                            <div className="text-center">
                                <h1 className="">Calorie Calculator</h1>
                                <p className=''>Track your calories, reach your health goals.</p>
                            </div>
                        </div>
                        {/* User Details */}
                        <div className="user-info w-full flex flex-col items-center gap-2">
                            {/* First Row */}
                            <OptionalRow
                                label="My Goal 😎"
                                selected={selectedGoal}
                                onChange={setSelectedGoal}
                                options={['Lose Fat', 'Maintain', 'Gain Muscle']} />
                            {/* Second Row */}
                            <OptionalRow
                                label="My Unit 🫡"
                                selected={selectedUnit}
                                onChange={setSelectedUnit}
                                options={['Kcal', 'Kg']} />
                            {/* Third Row */}
                            <OptionalRow
                                label="I Am 🧬"
                                selected={selectedGender}
                                onChange={setSelectedGender}
                                options={['Male', 'Female']} />
                            {/* Form Submission */}
                            <form onSubmit={handleSubmit} className=" w-full lg:w-5/6 flex flex-col gap-2">
                                {/* Weight */}
                                <div className="flex items-center gap-4 sm:!gap-4 md:!gap-5 lg:!gap-6 xl:!gap-10">
                                    <H6>Weight💪</H6>
                                    <input
                                        type='tel'
                                        inputMode='numeric'
                                        pattern='^\d{2,3}$'
                                        className="border sm:w-1/6 p-1 sm:!p-1 lg:!p-2 rounded"
                                        placeholder='lbs [0-999]'
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* Height */}
                                <div className="flex items-center gap-4 sm:!gap-4 md:!gap-5 lg:!gap-6 xl:!gap-10">
                                    <H6>Height🕴️</H6>
                                    <input
                                        type='tel'
                                        inputMode='numeric'
                                        pattern='^\d{1}$'
                                        className="border w-1/6 p-1 sm:!p-1 lg:!p-2 rounded"
                                        placeholder='Ft'
                                        value={heightFt}
                                        onChange={(e) => setHeightFt(e.target.value)}
                                        required
                                    />
                                    <input
                                        type='tel'
                                        inputMode='numeric'
                                        pattern='^\d{1}$'
                                        className="border w-1/6 p-1 sm:!p-1 lg:!p-2 rounded"
                                        placeholder='In'
                                        value={heightIn}
                                        onChange={(e) => setHeightIn(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* Age */}
                                <div className="flex items-center gap-9 sm:!gap-8 md:!gap-10 lg:!gap-11 xl:!gap-15">
                                    <H6>Age☠️</H6>
                                    <input
                                        type='tel'
                                        inputMode='numeric'
                                        pattern='^\d{2}$'
                                        className="border sm:w-1/6 p-1 sm:!p-1 lg:!p-2 rounded"
                                        placeholder='Age'
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className=" w-full lg:w-3/4">
                                    <H6>Weekly Cardio</H6>
                                    <div className="">
                                        <input
                                            type='range'
                                            min={0}
                                            max={20}
                                            value={range}
                                            onChange={(e) => setRange(e.target.value)}
                                            className="range w-full" />
                                        <div className="flex items-center justify-between px-2 lg:!p-0">
                                            <H6 className="">0 hrs/week</H6>
                                            <H6 className="">{range} hrs/week</H6>
                                            <H6 className="">20 hrs/week</H6>
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex items-center justify-start h-8">
                                    <input type='submit' className="w-full lg:w-3/4 h-full rounded text-white" value='Submit' />
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}

export default Calorie