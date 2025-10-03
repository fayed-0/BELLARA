import React, { useState } from 'react';
import Footer from '../../footer';
import partnerVisual from './source/img.png';

interface QA { q: string; a: string }
const FAQS: QA[] = [
	{ q: 'Is there a special program for bulk purchases of bags?', a: 'Yes, we offer a dedicated partnership program for customers who wish to purchase bags in bulk. This program is designed to provide additional benefits for resellers or business owners who want to include our products in their business. By joining our partnership program, you will gain access to exclusive pricing, attractive discounts, and ongoing support from our team, including product catalogs, new arrivals, and promotional updates.' },
	{ q: 'What is the minimum purchase requirement to qualify for partnership pricing?', a: 'To enjoy partnership pricing, the minimum order is 20 pieces per transaction. This requirement is set to make it accessible for new partners who want to start selling our products, while still ensuring flexibility in selecting different bag models. The more items you purchase, the greater your potential profit margin when reselling.' },
	{ q: 'How much discount do you offer for wholesale purchases?', a: 'The discount we offer depends on the total quantity purchased. Generally, discounts start at 10% for minimum orders and can go up to 30% for larger quantities. This tiered discount system allows partners to enjoy bigger price reductions and maximize their profit margins when reselling our products.' },
	{ q: 'Can I mix different bag models in a wholesale order?', a: 'Absolutely. We understand that every partner caters to different markets and customer preferences, so you are free to mix and match various bag models in a single order. The only requirement is that your total order quantity meets the minimum purchase requirement. This flexibility ensures that you can stock up on the right products that best suit your customers’ needs.' },
	{ q: 'What payment methods are available for partners?', a: 'We provide several convenient and secure payment options. Partners can make full upfront payments via bank transfer, e-wallets, or other agreed payment methods. For larger orders, we also offer a down payment (DP) option, with the remaining balance to be settled before shipment. This system gives partners greater flexibility in managing their cash flow while securing their order at the same time.' },
	{ q: 'Do you provide promotional support for reselling partners?', a: 'Yes, we go beyond supplying products by also supporting our partners in promoting them. We provide complete product catalogs, high-quality product images that are ready to use for marketing on social media or online marketplaces, and detailed product descriptions including material, size, and features. Additionally, we regularly share sales tips and market trend updates to help our partners improve their sales strategies and grow their business.' },
	{ q: 'How can I register as an official partner?', a: 'The registration process is simple and straightforward. You just need to contact our team via WhatsApp or official email. Once you get in touch, we will provide you with complete details about the partnership requirements, our latest product catalog, and special partner pricing. After your data and order are confirmed, you can make your first purchase at partnership rates and officially become one of our valued partners. From there, you will have full access to discounts, product updates, and promotional support.' },
];

const AccordionItem: React.FC<QA & { index: number; open: boolean; onToggle: () => void }> = ({ q, a, open, onToggle, index }) => {
	return (
		<div className="border-b border-neutral-200 dark:border-zinc-700">
			<button
				type="button"
				onClick={onToggle}
				aria-expanded={open}
				className="w-full flex items-center justify-between py-5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 dark:focus-visible:ring-white"
			>
				<span className="font-medium font-be-vietnam-pro text-neutral-800 dark:text-zinc-200 text-sm md:text-base pr-6">{q}</span>
				<span className={`text-neutral-600 dark:text-zinc-400 transition-transform duration-300 text-xl leading-none ${open ? 'rotate-45' : ''}`}>+</span>
			</button>
			<div className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
				<div className="overflow-hidden pb-5 pr-4">
					<p className="text-sm md:text-[15px] leading-relaxed text-neutral-600 dark:text-zinc-400 max-w-3xl">{a}</p>
				</div>
			</div>
		</div>
	);
};

const Partnership: React.FC = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
		return (
			<div className="font-inter flex flex-col min-h-screen bg-white dark:bg-zinc-950 transition-colors">
				<main className="flex-1">
					<section className="max-w-[1512px] mx-auto px-6 md:px-12 lg:px-[120px] pt-14 md:pt-20 pb-24">
						<div className="mb-14">
							<h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-5">Partnership FAQ</h1>
							<p className="text-neutral-600 dark:text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed">Discover everything you need to know about our wholesale & partnership program.</p>
						</div>
						<div className="grid md:grid-cols-[420px_minmax(0,1fr)] gap-10 md:gap-14 items-start">
							<div className="relative w-full overflow-hidden rounded-3xl h-[460px] md:h-[600px] bg-neutral-200 dark:bg-zinc-800">
								<img
									src={partnerVisual}
									alt="Minimalist tailored suit with white handbag display"
									className="w-full h-full object-cover object-center select-none"
									draggable={false}
								/>
								<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-black/10" />
							</div>
							{/* FAQ List */}
							<div className="space-y-0">
								{FAQS.map((item, i) => (
									<AccordionItem
										key={item.q}
										index={i}
										q={item.q}
										a={item.a}
										open={openIndex === i}
										onToggle={() => setOpenIndex(openIndex === i ? null : i)}
									/>
								))}
							</div>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		);
};

export default Partnership;

