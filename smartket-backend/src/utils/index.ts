import type { Response } from 'express'

export const errorHandler = (
	status: number,
	message: string | undefined,
	res: Response
) => {
	return res.json({
		success: false,
		status,
		message: message || 'Something went wrong',
	})
}
