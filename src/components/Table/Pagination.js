import React from 'react';
import Button from 'components/Button';

function Pagination({
	pageIndex,
	pageSize,
	pageCount,
	dataCount,
	onPageSizeChange,
	onGotoPage,
	onPagePrev,
	onPageNext,
}) {
	const startOffset = pageIndex * pageSize + 1;
	const endOffset = (pageIndex + 1) * pageSize;

	const isFirstPage = pageIndex === 0;
	const isLastPage = pageCount - 1 === pageIndex;

	const midPoint = Math.ceil(parseInt(pageCount / 2));
	const phase = midPoint >= pageIndex ? 'start' : 'end';
	const pageGap = 3;

	return (
		<>
			<div className="pagination mt-3">
				<section className="flex justify-between">
					<div>
						{!isFirstPage ? (
							<Button size="small" onClick={onPagePrev}>
								{'<'}
							</Button>
						) : null}

						{Array.from(Array(pageCount).keys()).map((idx, key) => {
							let shouldHide = idx !== pageCount - 1 && idx > pageCount - pageGap;
							let showEllipses = phase === 'end' ? idx === 1 : idx === pageCount - 1;

							if (phase === 'end') {
								shouldHide = idx !== 0 && idx < pageGap;
							}

							return (
								<>
									{showEllipses ? <span className="pr-2 text-2xl">...</span> : null}
									<span className={`mr-2 ${shouldHide ? 'hidden' : ''}`} key={key}>
										<Button
											onClick={() => onGotoPage(idx)}
											size="small"
											variant={idx === pageIndex ? 'outline' : null}
											key={key}
										>
											{idx + 1}
										</Button>
									</span>
								</>
							);
						})}
						{!isLastPage ? (
							<Button size="small" onClick={onPageNext}>
								{'>'}
							</Button>
						) : null}
						<select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
							{[10, 20, 40, 60].map((pageSize) => (
								<option key={pageSize} value={pageSize}>
									Show {pageSize}
								</option>
							))}
						</select>
					</div>
					<span>
						Showing{' '}
						<strong>
							{startOffset} – {endOffset} of {dataCount}
						</strong>{' '}
					</span>
				</section>
			</div>
		</>
	);
}

export default Pagination;
