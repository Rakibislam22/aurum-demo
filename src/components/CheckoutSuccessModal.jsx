import { FiArrowRight, FiCheckCircle, FiX } from "react-icons/fi";
import { Link } from "react-router";

export default function CheckoutSuccessModal({ open, onClose, orderNumber }) {
    if (!open) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[220] flex min-h-[100dvh] items-start justify-center overflow-y-auto bg-black/60 px-4 py-6 backdrop-blur-md sm:items-center"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="my-auto w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-[#121111] shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                <div className="flex items-start justify-between border-b border-white/10 px-5 py-4">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a96e]/30 bg-[#c9a96e]/10 text-[#c9a96e]">
                            <FiCheckCircle size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.34em] text-[#c9a96e]">Order created</p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#f5f2ed]">Success</h2>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#f5f2ed] transition-colors hover:border-[#c9a96e] hover:text-[#c9a96e]"
                        aria-label="Close success modal"
                    >
                        <FiX />
                    </button>
                </div>

                <div className="px-5 py-5">
                    <p className="text-sm leading-7 text-[#d8d1c7]">
                        Order {orderNumber} created. A person will connect you soon with the next steps.
                    </p>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a96e] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#0e0e0e] transition-transform duration-300 hover:scale-[1.02]"
                        >
                            Continue
                            <FiArrowRight />
                        </button>
                        <Link
                            to="/collections"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f5f2ed] transition-colors duration-300 hover:border-[#c9a96e] hover:text-[#c9a96e]"
                        >
                            Shop more
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
