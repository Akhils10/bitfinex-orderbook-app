import React from 'react'
import './Input.css'

const Input = ({
  name,
	icon,
  type = 'text',
	label,
	placeholder,
	onChange,
	onBlur,
	onFocus,
	value,
	className,
	disabled,
	required,
	min,
	max,
}) => {


  return (
    <div className={`input ${className}`}>
			{!!label && (
				<label className="input_label" htmlFor={name}>
					{label}
				</label>
			)}

			<div className="input_wrapper">
				{!!icon && (
					<figure className="input_icon">
						<img src={icon} alt="" />
					</figure>
				)}
				<input
					className="input_field"
					type={type}
					data-icon={!!icon}
					placeholder={placeholder}
					disabled={disabled}
					onChange={onChange}
					onBlur={onBlur}
					onFocus={onFocus}
					value={value}
					required={required}
					min={min}
					max={max}
				/>

			</div>
		</div>
  )
}

export default Input
