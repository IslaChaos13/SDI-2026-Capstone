const militaryAnnouncements = [
	// General
	{
		tag: "General",
		text: "Attention all personnel. Morning formation begins in 10 minutes.",
	},
	{
		tag: "General",
		text: "All units report current status to command immediately.",
	},
	{
		tag: "General",
		text: "Maintain operational readiness until further notice.",
	},
	{
		tag: "General",
		text: "Command reminds all personnel to verify equipment before deployment.",
	},
	{
		tag: "General",
		text: "Routine security patrols are now in effect across the installation.",
	},

	// Training
	{
		tag: "Training",
		text: "Training Exercise Falcon will commence at 0900 hours.",
	},
	{ tag: "Training", text: "Live-fire qualification is now open on Range 3." },
	{ tag: "Training", text: "Combat readiness drills begin in 15 minutes." },
	{
		tag: "Training",
		text: "Medical evacuation exercise is scheduled for this afternoon.",
	},
	{
		tag: "Training",
		text: "Personnel assigned to navigation training report to the briefing room.",
	},

	// Security
	{ tag: "Security", text: "Security Condition Bravo is now in effect." },
	{
		tag: "Security",
		text: "Unauthorized personnel are prohibited beyond checkpoint Charlie.",
	},
	{
		tag: "Security",
		text: "Random identification inspections are currently underway.",
	},
	{
		tag: "Security",
		text: "Remain vigilant and report suspicious activity immediately.",
	},
	{
		tag: "Security",
		text: "All access gates are operating under enhanced screening procedures.",
	},

	// Logistics
	{ tag: "Logistics", text: "Supply convoy has arrived at the motor pool." },
	{
		tag: "Logistics",
		text: "Fuel distribution operations begin at 1400 hours.",
	},
	{
		tag: "Logistics",
		text: "Inventory reconciliation is scheduled for all storage facilities.",
	},
	{
		tag: "Logistics",
		text: "Maintenance crews report to Hangar 2 immediately.",
	},
	{ tag: "Logistics", text: "Resupply operations are proceeding as planned." },

	// Weather
	{
		tag: "Weather",
		text: "Weather advisory: High winds expected this afternoon.",
	},
	{
		tag: "Weather",
		text: "Lightning detected within operational limits. Outdoor training is suspended.",
	},
	{
		tag: "Weather",
		text: "Heat index remains elevated. Hydration protocols are now in effect.",
	},
	{
		tag: "Weather",
		text: "Visibility reduced due to heavy fog. Exercise caution while driving.",
	},
	{ tag: "Weather", text: "Severe weather monitoring continues." },

	// Medical
	{
		tag: "Medical",
		text: "Medical staff report to the aid station immediately.",
	},
	{ tag: "Medical", text: "Routine health inspections begin at 1300 hours." },
	{ tag: "Medical", text: "Vaccination clinic is open until 1700 hours." },
	{
		tag: "Medical",
		text: "Personnel experiencing heat-related symptoms should seek medical assistance.",
	},
	{
		tag: "Medical",
		text: "Medical readiness evaluations continue throughout the day.",
	},

	// Base Operations
	{
		tag: "Base Operations",
		text: "Dining facility is now serving evening meal.",
	},
	{
		tag: "Base Operations",
		text: "Power maintenance will affect Building 14 for approximately 30 minutes.",
	},
	{
		tag: "Base Operations",
		text: "Communications systems maintenance begins at midnight.",
	},
	{
		tag: "Base Operations",
		text: "Vehicle inspections are required before departure.",
	},
	{
		tag: "Base Operations",
		text: "Base transportation services resume normal operations.",
	},

	// Ceremonial
	{ tag: "Ceremonial", text: "Retreat ceremony begins at 1700 hours." },
	{
		tag: "Ceremonial",
		text: "Please stand by for the playing of the national anthem.",
	},
	{ tag: "Ceremonial", text: "Flag detail report to the parade grounds." },
	{ tag: "Ceremonial", text: "Awards ceremony will begin shortly." },
	{
		tag: "Ceremonial",
		text: "Guests are requested to remain seated until the ceremony concludes.",
	},
];

export default function getRandomAnnouncements(count = 1) {
	const shuffle = [...militaryAnnouncements].sort(() => Math.random() - 0.5);
	const picks = shuffle.slice(0, count);
	return count === 1 ? picks[0] : picks;
}
